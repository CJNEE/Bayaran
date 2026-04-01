import React, { useState } from 'react'

const AddEmployeeForm = ({ users, setUsers }) => {
  const [formData, setFormData] = useState({ name: '', section: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.section) return
    const newUserId = 'STUD' + Date.now().toString().slice(-6)
    const newUser = {
      id: newUserId,
      name: formData.name,
      section: formData.section
    }
    setUsers([...users, newUser])
    localStorage.setItem('users', JSON.stringify([...users, newUser]))
    setFormData({ name: '', section: '' })
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Student</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <select
              value={formData.section}
              onChange={(e) => setFormData({...formData, section: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Section</option>
              <option value="1A">1A</option>
              <option value="1B">1B</option>
              <option value="1C">1C</option>
              <option value="2A">2A</option>
              <option value="2B">2B</option>
              <option value="2C">2C</option>
              <option value="3A">3A</option>
              <option value="3B">3B</option>
              <option value="3C">3C</option>
              <option value="4A">4A</option>
              <option value="4B">4B</option>
              <option value="4C">4C</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Add Employee
          </button>
        </form>
        <div className="p-6 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-4">All Students ({users.length})</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.section || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEmployeeForm

