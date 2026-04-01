import React from 'react'

const Navbar = ({ activeTab, setActiveTab, onLogout }) => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Bayaran Student System</h1>
        <div className="flex space-x-4">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'dashboard' ? 'bg-blue-700 shadow-lg' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('add-employee')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'add-employee' ? 'bg-blue-700 shadow-lg' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            Add Employee
          </button>
          <button 
            onClick={() => setActiveTab('attendance')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'attendance' ? 'bg-blue-700 shadow-lg' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            Attendance
          </button>
          <button 
            onClick={() => setActiveTab('payment')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'payment' ? 'bg-blue-700 shadow-lg' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            Payment
          </button>
          <button 
            onClick={() => setActiveTab('excel')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'excel' ? 'bg-purple-700 shadow-lg' : 'bg-purple-500 hover:bg-purple-600'} text-white`}
          >
            Excel Upload
          </button>
          <button 
            onClick={onLogout}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-all text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

