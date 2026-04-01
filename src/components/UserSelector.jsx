import React from 'react'

const UserSelector = ({ users, selectedUserId, onSelect }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Select Student</label>
      <select
        value={selectedUserId}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
      >
        <option value="">Choose a user...</option>
        {users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name} ({user.section})
          </option>
        ))}
      </select>
    </div>
  )
}

export default UserSelector

