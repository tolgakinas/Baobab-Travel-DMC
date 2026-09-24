import React from 'react';
import { useSiteContent, StatItem } from '../../context/SiteContentContext';
import { Hash, Plus, Trash2, TrendingUp, Sparkles } from 'lucide-react';

export const MetricsNumbersTab: React.FC = () => {
  const { content, updateStats } = useSiteContent();

  const handleStatChange = (index: number, field: keyof StatItem, value: string) => {
    const nextStats = [...content.stats];
    if (nextStats[index]) {
      nextStats[index] = { ...nextStats[index], [field]: value };
      updateStats(nextStats);
    }
  };

  const handleAddStat = () => {
    const newStat: StatItem = {
      value: '100%',
      label: 'New Metric Label',
      sub: 'Supporting operational indicator'
    };
    updateStats([...content.stats, newStat]);
  };

  const handleDeleteStat = (index: number) => {
    if (content.stats.length <= 1) return;
    const nextStats = content.stats.filter((_, i) => i !== index);
    updateStats(nextStats);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <Hash className="w-5 h-5 text-[#F05A28]" />
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                Key Performance Numbers & Statistics Bar ({content.stats.length})
              </h3>
              <p className="text-xs text-neutral-500">
                Control the numeric metrics, percentages, turnaround times, and trust figures displayed in the prominent header stats bar.
              </p>
            </div>
          </div>

          <button
            onClick={handleAddStat}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Stat Metric</span>
          </button>
        </div>

        {/* Live Preview Card */}
        <div className="mb-6 p-4 rounded-lg bg-neutral-50 border border-neutral-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#F05A28]" />
            <span>Live Stats Bar Preview</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {content.stats.map((stat, i) => (
              <div key={i} className="p-3 bg-white rounded border border-neutral-200 shadow-xs">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 tracking-tight flex items-baseline gap-1">
                  <span>{stat.value}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F05A28]" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-800 mt-1 line-clamp-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editable Stat Items */}
        <div className="space-y-4">
          {content.stats.map((stat, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border border-neutral-200 bg-white hover:border-neutral-300 transition-colors flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-mono font-bold text-neutral-600 shrink-0">
                #{index + 1}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 flex-1 w-full">
                {/* Number / Value */}
                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">
                    Value / Number (e.g. 24+, 99.4%)
                  </label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                    className="w-full px-3 py-1.5 text-sm font-serif font-bold text-[#F05A28] border border-neutral-300 rounded focus:outline-none focus:border-[#F05A28]"
                  />
                </div>

                {/* Main Label */}
                <div className="sm:col-span-4">
                  <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">
                    Metric Heading
                  </label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs font-semibold text-neutral-900 border border-neutral-300 rounded focus:outline-none focus:border-[#F05A28]"
                  />
                </div>

                {/* Subtitle / Description */}
                <div className="sm:col-span-5">
                  <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">
                    Supporting Detail Text
                  </label>
                  <input
                    type="text"
                    value={stat.sub}
                    onChange={(e) => handleStatChange(index, 'sub', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs text-neutral-600 border border-neutral-300 rounded focus:outline-none focus:border-[#F05A28]"
                  />
                </div>
              </div>

              <button
                onClick={() => handleDeleteStat(index)}
                disabled={content.stats.length <= 1}
                className="p-2 text-neutral-400 hover:text-red-600 disabled:opacity-30 rounded transition-colors self-end sm:self-center shrink-0"
                title="Remove Metric"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
