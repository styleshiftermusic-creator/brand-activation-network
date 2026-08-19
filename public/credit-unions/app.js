import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  projectId: "ban-credit-union-app",
  appId: "1:663630397524:web:b8ffea306dad98ab0cedc1",
  storageBucket: "ban-credit-union-app.firebasestorage.app",
  apiKey: "AIzaSyA_zuJemDWSTyUv0mLcLsQwo4aAPQSS_Vc",
  authDomain: "ban-credit-union-app.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let CREDIT_UNIONS = [];

const state = {
  searchQuery: '',
  filters: {
    creditPull: 'all',      // 'all' | 'Soft' | 'Hard' | 'No Credit'
    creditBureau: 'all',    // 'all' | 'Experian' | 'Equifax' | 'TransUnion'
    joinAnywhere: false,
    chexSystems: 'all',     // 'all' | 'No' | 'Yes'
    hpReuse: false,
    plocRate: 'all',        // 'all' | 'hasRate' | 'under10' | 'under12'
    favoritesOnly: false,
    promoOnly: false,
  },
  favorites: [],            // array of CU ids from localStorage
  compareList: [],          // array of CU ids
  sortBy: 'name',           // 'name' | 'plocRate' | 'creditPull'
};

// DOM Elements
const els = {
  searchInput: document.getElementById('search-input'),
  searchClear: document.getElementById('search-clear'),
  resultsGrid: document.getElementById('results-grid'),
  resultsCount: document.getElementById('results-count'),
  sortSelect: document.getElementById('sort-select'),
  clearFiltersBtn: document.getElementById('clear-filters'),
  
  // Dialogs
  detailDialog: document.getElementById('cu-detail-dialog'),
  closeDetailBtn: document.getElementById('close-detail'),
  compareDialog: document.getElementById('compare-dialog'),
  closeCompareBtn: document.getElementById('close-compare'),
  
  // Compare Tray
  compareTray: document.getElementById('compare-tray'),
  compareCount: document.getElementById('compare-count'),
  compareClearBtn: document.getElementById('compare-clear'),
  compareNowBtn: document.getElementById('compare-now'),
  compareTableWrapper: document.getElementById('compare-table-wrapper'),
  
  // Mobile
  mobileFilterBtn: document.getElementById('mobile-filter-btn'),
  filterPanel: document.getElementById('filter-panel')
};

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
  els.resultsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #5A6B7E;">Loading Credit Unions...</p>';
  try {
    const snap = await getDocs(collection(db, "credit_unions"));
    CREDIT_UNIONS = snap.docs.map(d => ({ id: parseInt(d.id), ...d.data() }));
    CREDIT_UNIONS.sort((a,b) => a.name.localeCompare(b.name));
  } catch(e) {
    console.error("Firebase error", e);
    els.resultsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: red;">Error loading data.</p>';
    return;
  }
  
  // Load favorites
  const savedFavs = localStorage.getItem('cu-favorites');
  if (savedFavs) {
    try {
      state.favorites = JSON.parse(savedFavs);
    } catch(e) {
      state.favorites = [];
    }
  }
  
  updateStats();
  initEventListeners();
  applyFiltersAndRender();
});


// Event Listeners
function initEventListeners() {
  // Search
  let debounceTimeout;
  els.searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      handleSearch(e.target.value);
    }, 150);
    els.searchClear.style.display = e.target.value ? 'block' : 'none';
  });

  els.searchClear.addEventListener('click', () => {
    els.searchInput.value = '';
    els.searchClear.style.display = 'none';
    handleSearch('');
  });

  // Filter Chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const group = e.target.closest('.filter-group__options');
      if (!group) return;
      const filterType = group.id.replace('filter-', '');
      const value = e.target.dataset.value;
      
      // Update UI
      group.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('filter-chip--active'));
      e.target.classList.add('filter-chip--active');
      
      handleFilterChange(filterType, value);
    });
  });

  // Toggle Switches
  document.querySelectorAll('.filter-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      const isChecked = e.target.getAttribute('aria-checked') === 'true';
      const newValue = !isChecked;
      e.target.setAttribute('aria-checked', newValue.toString());
      e.target.classList.toggle('filter-toggle--active', newValue);
      
      const filterType = e.target.id.replace('filter-', '');
      handleFilterChange(filterType, newValue);
    });
  });

  // Sort
  els.sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    applyFiltersAndRender();
  });

  // Clear Filters
  els.clearFiltersBtn.addEventListener('click', clearFilters);

  // Detail Dialog
  els.closeDetailBtn.addEventListener('click', () => els.detailDialog.close());
  els.detailDialog.addEventListener('click', (e) => {
    const dialogDimensions = els.detailDialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      els.detailDialog.close();
    }
  });

  // Compare Dialog
  els.closeCompareBtn.addEventListener('click', () => els.compareDialog.close());
  els.compareDialog.addEventListener('click', (e) => {
    const dialogDimensions = els.compareDialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      els.compareDialog.close();
    }
  });

  // Compare Tray Buttons
  els.compareClearBtn.addEventListener('click', () => {
    state.compareList = [];
    updateCompareTray();
    applyFiltersAndRender();
  });

  els.compareNowBtn.addEventListener('click', showComparison);

  // Mobile Filter
  els.mobileFilterBtn.addEventListener('click', () => {
    els.filterPanel.classList.toggle('filter-panel--open');
  });

  // Escape to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (els.detailDialog.open) els.detailDialog.close();
      if (els.compareDialog.open) els.compareDialog.close();
    }
  });

  // Quick Filters
  document.querySelectorAll('.quick-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Toggle active state
      const wasActive = e.target.classList.contains('quick-filter-btn--active');
      document.querySelectorAll('.quick-filter-btn').forEach(b => b.classList.remove('quick-filter-btn--active'));
      
      if (!wasActive) {
        e.target.classList.add('quick-filter-btn--active');
        applyQuickFilter(e.target.dataset.preset);
      } else {
        clearFilters();
      }
    });
  });

  // Export CSV
  const exportBtn = document.getElementById('export-csv');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportCSV);
  }
}

// Logic Functions
function handleSearch(query) {
  state.searchQuery = query.toLowerCase().trim();
  applyFiltersAndRender();
}

function handleFilterChange(filterType, value) {
  state.filters[filterType] = value;
  applyFiltersAndRender();
}

function clearFilters() {
  state.filters = {
    creditPull: 'all',
    creditBureau: 'all',
    joinAnywhere: false,
    chexSystems: 'all',
    hpReuse: false,
    plocRate: 'all',
    favoritesOnly: false
  };
  
  // Reset UI
  document.querySelectorAll('.filter-group__options').forEach(group => {
    group.querySelectorAll('.filter-chip').forEach(chip => {
      chip.classList.toggle('filter-chip--active', chip.dataset.value === 'all');
    });
  });
  
  document.querySelectorAll('.filter-toggle').forEach(toggle => {
    toggle.setAttribute('aria-checked', 'false');
    toggle.classList.remove('filter-toggle--active');
  });

  document.querySelectorAll('.quick-filter-btn').forEach(b => b.classList.remove('quick-filter-btn--active'));

  els.searchInput.value = '';
  els.searchClear.style.display = 'none';
  state.searchQuery = '';
  
  applyFiltersAndRender();
}

// Make globally available for template empty state
window.clearFilters = clearFilters;

function filterCreditUnions() {
  return CREDIT_UNIONS.filter(cu => {
    // 1. Search Query
    if (state.searchQuery) {
      const q = state.searchQuery;
      const matchesSearch = 
        (cu.name && cu.name.toLowerCase().includes(q)) ||
        (cu.eligibility && cu.eligibility.toLowerCase().includes(q)) ||
        (cu.dataNotes && cu.dataNotes.toLowerCase().includes(q)) ||
        (cu.creditBureau && cu.creditBureau.toLowerCase().includes(q));
      if (!matchesSearch) return false;
    }

    // 2. Filters
    const { creditPull, creditBureau, joinAnywhere, chexSystems, hpReuse, plocRate, favoritesOnly } = state.filters;
    
    if (favoritesOnly && !state.favorites.includes(cu.id)) return false;
    
    if (creditPull !== 'all' && cu.creditPull !== creditPull) return false;
    if (creditBureau !== 'all' && cu.creditBureau !== creditBureau) return false;
    if (joinAnywhere && !cu.joinAnywhere) return false;
    if (chexSystems !== 'all' && cu.chexSystems !== chexSystems) return false;
    if (hpReuse && cu.hpReuse !== true) return false;
    
    if (plocRate !== 'all') {
      if (plocRate === 'hasRate' && cu.plocRate === null) return false;
      if (plocRate === 'under10' && (cu.plocRate === null || cu.plocRate >= 10)) return false;
      if (plocRate === 'under12' && (cu.plocRate === null || cu.plocRate >= 12)) return false;
    }

    return true;
  });
}

function sortResults(results) {
  return results.sort((a, b) => {
    if (state.sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (state.sortBy === 'plocRate') {
      // Handle nulls by pushing them to the bottom
      if (a.plocRate === null && b.plocRate === null) return 0;
      if (a.plocRate === null) return 1;
      if (b.plocRate === null) return -1;
      return a.plocRate - b.plocRate;
    } else if (state.sortBy === 'creditPull') {
      // Soft < No Credit < Hard < Unknown
      const order = { 'Soft': 1, 'No Credit': 2, 'Hard': 3, '': 4 };
      const aVal = order[a.creditPull] || 4;
      const bVal = order[b.creditPull] || 4;
      return aVal - bVal;
    }
    return 0;
  });
}

function applyFiltersAndRender() {
  const filtered = filterCreditUnions();
  const sorted = sortResults(filtered);
  renderResults(sorted);
}

function renderResults(filteredCUs) {
  els.resultsCount.textContent = `Showing ${filteredCUs.length} of ${CREDIT_UNIONS.length} credit unions`;
  
  if (filteredCUs.length === 0) {
    const template = document.getElementById('empty-state-template');
    els.resultsGrid.innerHTML = '';
    els.resultsGrid.appendChild(template.content.cloneNode(true));
    return;
  }

  els.resultsGrid.innerHTML = filteredCUs.map(cu => createCardHTML(cu)).join('');
}

function createCardHTML(cu) {
  const isCompared = state.compareList.includes(cu.id);
  const isFavorite = state.favorites.includes(cu.id);
  
  // Badges
  let pullBadgeClass = '';
  if (cu.creditPull === 'Hard') pullBadgeClass = 'cu-card__badge--hard';
  else if (cu.creditPull === 'Soft') pullBadgeClass = 'cu-card__badge--soft';
  else if (cu.creditPull === 'No Credit') pullBadgeClass = 'cu-card__badge--nocredit';

  const pullBadge = pullBadgeClass ? `<span class="cu-card__badge ${pullBadgeClass}">${cu.creditPull} Pull</span>` : '';
  const bureauBadge = cu.creditBureau && cu.creditBureau !== 'Unknown' ? `<span class="cu-card__bureau-tag">${cu.creditBureau}</span>` : '';
  const anywhereBadge = cu.joinAnywhere ? `
    <span class="join-anywhere-badge">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      Join Anywhere
    </span>` : '';

  const plocDisplay = cu.plocRate ? `${cu.plocRate}%` : 'N/A';
  const cardRateDisplay = cu.lowestCardRate ? `${cu.lowestCardRate}%` : 'N/A';
  const hpDisplay = cu.hpReuse === true ? 'Yes' : (cu.hpReuse === false ? 'No' : 'Unk');
  const chexDisplay = cu.chexSystems || 'Unk';

  return `
    <div class="cu-card">
      <div class="cu-card__header">
        <div class="cu-card__header-top">
          <h3 class="cu-card__name" onclick="window.showDetail('${cu.id}')">${cu.name}</h3>
          <button class="cu-card__favorite ${isFavorite ? 'cu-card__favorite--active' : ''}" onclick="window.toggleFavorite('${cu.id}', event)" title="Toggle Favorite">
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        </div>
        <div class="cu-card__badges">
          ${pullBadge}
          ${bureauBadge}
          ${anywhereBadge}
        </div>
      </div>
      
      <div class="cu-card__eligibility" title="${cu.eligibility}">
        ${cu.eligibility || 'Eligibility details unavailable.'}
      </div>
      
      <div class="cu-card__details">
        <div class="cu-card__stat">
          <span class="cu-card__stat-label">PLOC Rate</span>
          <span class="cu-card__stat-value">${plocDisplay}</span>
        </div>
        <div class="cu-card__stat">
          <span class="cu-card__stat-label">Card Rate</span>
          <span class="cu-card__stat-value">${cardRateDisplay}</span>
        </div>
        <div class="cu-card__stat">
          <span class="cu-card__stat-label">HP Reuse</span>
          <span class="cu-card__stat-value">${hpDisplay}</span>
        </div>
      </div>
      
      <div class="cu-card__actions">
        <button class="cu-card__btn cu-card__btn--outline" onclick="window.showDetail('${cu.id}')">Details</button>
        <label class="cu-card__compare-label">
          <input type="checkbox" class="cu-card__compare-check" onchange="window.toggleCompare('${cu.id}')" ${isCompared ? 'checked' : ''}>
          Compare
        </label>
        <a href="${cu.url || '#'}" target="_blank" rel="noopener noreferrer" class="cu-card__btn cu-card__btn--primary">Visit</a>
      </div>
    </div>
  `;
}

// Global functions for inline handlers
window.showDetail = function(cuId) {
  cuId = Number(cuId);
  const cu = CREDIT_UNIONS.find(c => c.id === cuId);
  if (!cu) return;

  document.getElementById('detail-name').textContent = cu.name;
  
  // URL
  const urlEl = document.getElementById('detail-url');
  if (cu.url) {
    urlEl.href = cu.url;
    urlEl.textContent = cu.url;
    document.getElementById('detail-visit-btn').href = cu.url;
    document.getElementById('detail-visit-btn').style.display = 'inline-block';
  } else {
    urlEl.removeAttribute('href');
    urlEl.textContent = 'Not provided';
    document.getElementById('detail-visit-btn').style.display = 'none';
  }

  // Badges
  let pullBadgeClass = '';
  if (cu.creditPull === 'Hard') pullBadgeClass = 'cu-card__badge--hard';
  else if (cu.creditPull === 'Soft') pullBadgeClass = 'cu-card__badge--soft';
  else if (cu.creditPull === 'No Credit') pullBadgeClass = 'cu-card__badge--nocredit';

  const badgesHtml = [
    pullBadgeClass ? `<span class="cu-card__badge ${pullBadgeClass}">${cu.creditPull} Pull</span>` : '',
    cu.creditBureau && cu.creditBureau !== 'Unknown' ? `<span class="cu-card__bureau-tag">${cu.creditBureau}</span>` : '',
  ].join('');
  document.getElementById('detail-badges').innerHTML = badgesHtml;

  // Notes
  if (cu.dataNotes) {
    document.getElementById('detail-notes-container').style.display = 'block';
    document.getElementById('detail-notes').textContent = cu.dataNotes;
  } else {
    document.getElementById('detail-notes-container').style.display = 'none';
  }

  // Text fields
  document.getElementById('detail-eligibility').textContent = cu.eligibility || 'N/A';
  document.getElementById('detail-join-anywhere').textContent = cu.joinAnywhere ? 'Yes' : 'No';
  document.getElementById('detail-pull').textContent = cu.creditPull || 'Unknown';
  document.getElementById('detail-bureau').textContent = cu.creditBureau || 'Unknown';
  
  const hpReuseText = cu.hpReuse === true ? 'Yes' : (cu.hpReuse === false ? 'No' : 'Unknown');
  document.getElementById('detail-hp-reuse').textContent = hpReuseText;
  document.getElementById('detail-hp-duration').textContent = cu.hpDuration || 'N/A';
  
  document.getElementById('detail-chex').textContent = cu.chexSystems || 'Unknown';
  document.getElementById('detail-ploc').textContent = cu.plocRate ? `${cu.plocRate}%` : 'N/A';
  
  // New fields
  const cardRateEl = document.getElementById('detail-card-rate');
  if (cardRateEl) cardRateEl.textContent = cu.lowestCardRate ? `${cu.lowestCardRate}%` : 'N/A';
  
  const rewardsCardEl = document.getElementById('detail-rewards-card');
  if (rewardsCardEl) rewardsCardEl.textContent = cu.rewardsCardRate ? `${cu.rewardsCardRate}%` : 'N/A';
  
  const rewardsCheckingContainer = document.getElementById('detail-rewards-checking-container');
  const rewardsCheckingEl = document.getElementById('detail-rewards-checking');
  if (rewardsCheckingContainer && rewardsCheckingEl) {
    if (cu.rewardsChecking) {
      rewardsCheckingContainer.style.display = 'block';
      rewardsCheckingEl.textContent = cu.rewardsChecking;
    } else {
      rewardsCheckingContainer.style.display = 'none';
    }
  }

  els.detailDialog.showModal();
};

window.toggleCompare = function(cuId) {
  cuId = Number(cuId);
  const index = state.compareList.indexOf(cuId);
  if (index === -1) {
    if (state.compareList.length >= 3) {
      alert('You can only compare up to 3 credit unions at a time.');
      // Revert the checkbox visually
      applyFiltersAndRender();
      return;
    }
    state.compareList.push(cuId);
  } else {
    state.compareList.splice(index, 1);
  }
  
  updateCompareTray();
  applyFiltersAndRender(); // Re-render to update checkbox state across view
};

window.toggleFavorite = function(cuId, event) {
  event.stopPropagation();
  cuId = Number(cuId);
  const index = state.favorites.indexOf(cuId);
  if (index === -1) {
    state.favorites.push(cuId);
  } else {
    state.favorites.splice(index, 1);
  }
  localStorage.setItem('cu-favorites', JSON.stringify(state.favorites));
  applyFiltersAndRender();
};

function applyQuickFilter(preset) {
  clearFilters();
  if (preset === 'joinAnywhere') {
    state.filters.joinAnywhere = true;
    document.getElementById('filter-joinAnywhere').setAttribute('aria-checked', 'true');
    document.getElementById('filter-joinAnywhere').classList.add('filter-toggle--active');
  } else if (preset === 'softPull') {
    state.filters.creditPull = 'Soft';
    updateFilterChips('filter-creditPull', 'Soft');
  } else if (preset === 'topRewards') {
    // Show only those with rewards checking info
    state.searchQuery = 'rewards checking';
  } else if (preset === 'bestPloc') {
    state.filters.plocRate = 'under10';
    updateFilterChips('filter-plocRate', 'under10');
    state.sortBy = 'plocRate';
    els.sortSelect.value = 'plocRate';
  }
  applyFiltersAndRender();
}

function updateFilterChips(groupId, activeValue) {
  const group = document.getElementById(groupId);
  if (group) {
    group.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('filter-chip--active'));
    const target = group.querySelector(`.filter-chip[data-value="${activeValue}"]`);
    if (target) target.classList.add('filter-chip--active');
  }
}

function exportCSV() {
  const filtered = filterCreditUnions();
  const sorted = sortResults(filtered);
  
  if (sorted.length === 0) {
    alert('No data to export.');
    return;
  }
  
  const headers = ['Name', 'Eligibility', 'Credit Pull', 'Credit Bureau', 'PLOC Rate', 'Card Rate', 'URL'];
  const rows = sorted.map(cu => [
    `"${(cu.name || '').replace(/"/g, '""')}"`,
    `"${(cu.eligibility || '').replace(/"/g, '""')}"`,
    cu.creditPull || '',
    cu.creditBureau || '',
    cu.plocRate ? `${cu.plocRate}%` : '',
    cu.lowestCardRate ? `${cu.lowestCardRate}%` : '',
    `"${cu.url || ''}"`
  ]);
  
  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'credit-unions-export.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function updateCompareTray() {
  els.compareCount.textContent = state.compareList.length;
  
  if (state.compareList.length > 0) {
    els.compareTray.classList.add('visible');
    els.compareNowBtn.disabled = state.compareList.length < 2;
  } else {
    els.compareTray.classList.remove('visible');
  }
}

function showComparison() {
  if (state.compareList.length < 2) return;
  
  const cus = state.compareList.map(id => CREDIT_UNIONS.find(c => c.id === id)).filter(Boolean);
  
  const rows = [
    { label: 'Name', key: 'name', isHeader: true },
    { label: 'Eligibility', key: 'eligibility' },
    { label: 'Join Anywhere', key: 'joinAnywhere', format: v => v ? 'Yes' : 'No' },
    { label: 'Credit Pull', key: 'creditPull' },
    { label: 'Credit Bureau', key: 'creditBureau' },
    { label: 'HP Reuse', key: 'hpReuse', format: v => v === true ? 'Yes' : (v === false ? 'No' : 'Unknown') },
    { label: 'HP Duration', key: 'hpDuration' },
    { label: 'ChexSystems', key: 'chexSystems' },
    { label: 'PLOC Rate', key: 'plocRate', format: v => v ? `${v}%` : 'N/A' },
    { label: 'Lowest Card Rate', key: 'lowestCardRate', format: v => v ? `${v}%` : 'N/A' },
    { label: 'Rewards Card Rate', key: 'rewardsCardRate', format: v => v ? `${v}%` : 'N/A' },
    { label: 'Rewards Checking', key: 'rewardsChecking', format: v => v || 'N/A' },
  ];

  let html = `<table class="compare-table">
    <thead>
      <tr>
        <th>Feature</th>
        ${cus.map(cu => `<th><div style="font-weight:700; color:var(--color-text-primary)">${cu.name}</div></th>`).join('')}
      </tr>
    </thead>
    <tbody>`;

  rows.forEach(row => {
    if (row.isHeader) return; // Skip name in rows since it's in thead
    
    html += `<tr>
      <th>${row.label}</th>
      ${cus.map(cu => {
        let val = cu[row.key];
        if (row.format) val = row.format(val);
        return `<td>${val || 'N/A'}</td>`;
      }).join('')}
    </tr>`;
  });

  html += `</tbody></table>`;
  
  els.compareTableWrapper.innerHTML = html;
  els.compareDialog.showModal();
}

function updateStats() {
  if (!CREDIT_UNIONS || CREDIT_UNIONS.length === 0) return;
  
  document.getElementById('stat-total').textContent = CREDIT_UNIONS.length;
  
  const softPulls = CREDIT_UNIONS.filter(c => c.creditPull === 'Soft').length;
  document.getElementById('stat-soft').textContent = softPulls;
  
  const joinAnywhere = CREDIT_UNIONS.filter(c => c.joinAnywhere).length;
  document.getElementById('stat-anywhere').textContent = joinAnywhere;
  
  const rates = CREDIT_UNIONS.map(c => c.plocRate).filter(r => r !== null && r > 0);
  if (rates.length > 0) {
    const avgRate = rates.reduce((a, b) => a + b, 0) / rates.length;
    document.getElementById('stat-rate').textContent = `${avgRate.toFixed(1)}%`;
  } else {
    document.getElementById('stat-rate').textContent = 'N/A';
  }
}
