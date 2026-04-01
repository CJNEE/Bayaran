import React, { useState } from 'react'
import UserSelector from './UserSelector'

const PaymentTable = ({ users, paymentRecords, setPaymentRecords }) => {
  const [selectedUserId, setSelectedUserId] = useState('')
  const [status, setStatus] = useState('Paid')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [amount, setAmount] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const selectedUser = users.find(u => u.id === selectedUserId)

  const handleAddRecord = () => {
    if (!selectedUserId) return
    const newRecord = {
      userId: selectedUserId,
      date,
      status,
      amount: status === 'Paid' ? amount : null
    }
    setPaymentRecords([...paymentRecords, newRecord])
    setSelectedUserId('')
    setStatus('Paid')
    setDate(new Date().toISOString().split('T')[0])
    setAmount('')
  }

  const filteredRecords = paymentRecords.filter(r => {
    const user = users.find(u => u.id === r.userId)
    const matchesSearch = searchTerm === '' || (user && (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.id.includes(searchTerm) || user.section?.toLowerCase().includes(searchTerm.toLowerCase())))
    const matchesFilter = filterStatus === 'all' || r.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const userRecords = filteredRecords.filter(r => r.userId === selectedUserId)

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Payment Records</h2>
      
      {/* Search & Filter */}
      <div className="mb-6 p-6 bg-green-50 rounded-lg">
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search name/ID/section..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
            <option value="all">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Not Paid">Unpaid</option>
          </select>
        </div>
      </div>

      {/* Add Record Form */}
      <div className="grid md:grid-cols-2 gap-6 mb-8 p-6 bg-green-50 rounded-lg">
        <UserSelector 
          users={users} 
          selectedUserId={selectedUserId} 
          onSelect={setSelectedUserId} 
        />
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="Paid">Paid</option>
              <option value="Not Paid">Not Paid</option>
            </select>
          </div>
          {status === 'Paid' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g., 100"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                step="0.01"
                min="0"
              />
            </div>
          )}
          <button
            onClick={handleAddRecord}
            disabled={!selectedUserId || (status === 'Paid' && !amount)}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:ring-2 focus:ring-green-500 transition-all"
          >
            Record Payment
          </button>
        </div>
      </div>

      {/* History Table */}
      {selectedUser && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              History for {selectedUser.name}
            </h3>
            <span className="text-sm text-gray-500">{userRecords.length} records</span>
          </div>
          {userRecords.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No payment records yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    {userRecords.some(r => r.amount) && (
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {userRecords.sort((a, b) => new Date(b.date) - new Date(a.date)).map((record, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{new Date(record.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          record.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      {record.amount && (
                        <td className="px-6 py-4 text-sm font-mono text-gray-900">${parseFloat(record.amount).toFixed(2)}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PaymentTable

