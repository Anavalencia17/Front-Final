import { Trash2 } from 'lucide-react';

export default function ReservationCard({ expense, onDelete }) {
  return (
    <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-xs flex justify-between items-center hover:bg-gray-50 transition-colors">
      <div>
        <h4 className="font-semibold text-gray-900">{expense.desc}</h4>
        <div className="flex gap-2 items-center mt-1">
          <span className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 font-medium">{expense.category}</span>
          <span className="text-xs text-gray-400">{expense.date}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-lg font-bold text-gray-900">-${expense.amount.toFixed(2)}</span>
        <button onClick={() => onDelete(expense.id)} className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}