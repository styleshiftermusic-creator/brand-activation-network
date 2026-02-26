import { Loader2, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export function MetricChart({
    data,
    loading
}: {
    data: any[];
    loading: boolean;
}) {
    return (
        <div className="mb-8 p-6 bg-black/40 backdrop-blur-md border border-[var(--primary)]/20 rounded-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent pointer-events-none" />
            <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                <Activity className="h-5 w-5 text-[var(--primary)]" />
                Network Telemetry {loading && <Loader2 className="h-4 w-4 animate-spin text-zinc-500 ml-2" />}
            </h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" vertical={false} opacity={0.4} />
                        <XAxis dataKey="time" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="load" stroke="var(--primary)" fillOpacity={1} fill="url(#colorLoad)" strokeWidth={2} />
                        <Area type="monotone" dataKey="efficiency" stroke="#22c55e" fillOpacity={1} fill="url(#colorEff)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
