import React, { useState, useEffect } from 'react'

const INITIAL_STUDENTS = [
  { id: '001', name: 'Adrian De Mesa', section: '1b' },
  { id: '002', name: 'Adrian Neil Afuang', section: '1b' },
  { id: '003', name: 'Ailyn Canillo', section: '2c' },
  { id: '004', name: 'Allysa Viñalon', section: '2c' },
  { id: '005', name: 'Aly Gonzales Panopio', section: '1b' },
  { id: '006', name: 'Andrei Basco', section: '2b' },
  { id: '007', name: 'Andrei Menemendez', section: '1b' },
  { id: '008', name: 'Andrian Marino', section: '2c' },
  { id: '009', name: 'Angela Quejano', section: '1b' },
  { id: '010', name: 'Angeline Magada', section: '2c' },
  { id: '011', name: 'Angelyn Pimentel', section: '1c' },
  { id: '012', name: 'Aries De Guzman', section: '1a' },
  { id: '013', name: 'Arwin C. Boca', section: '2b' },
  { id: '014', name: 'Azeth Arvine L. Brandes', section: '1a' },
  { id: '015', name: 'Azil Nheecolle Riego', section: '2c' },
  { id: '016', name: 'Benaiah C. Escobar', section: '1b' },
  { id: '017', name: 'Bry Echevarria', section: '1a' },
  { id: '018', name: 'Carl Demandante Chua', section: '2a' },
  { id: '019', name: 'Cee Jay Petalvero', section: '2a' },
  { id: '020', name: 'Charles Jayson Asegurado', section: '2b' },
  { id: '021', name: 'Christian Jay Cabile Endozo', section: '2a' },
  { id: '022', name: 'Christian Lenard Melecia', section: '2a' },
  { id: '023', name: 'Clark Dimaano', section: '1c' },
  { id: '024', name: 'Clark Sepillo', section: '2a' },
  { id: '025', name: 'Clyde Capistrano', section: '2a' },
  { id: '026', name: 'Cynon De Leon', section: '2a' },
  { id: '027', name: 'Dan Gabriel Deyro', section: '1c' },
  { id: '028', name: 'Daniel Oco', section: '1b' },
  { id: '029', name: 'Donn Balmaceda', section: '1b' },
  { id: '030', name: 'Dynneal Antonio', section: '1a' },
  { id: '031', name: 'Elton Mart Lbaguis', section: '2b' },
  { id: '032', name: 'Earl John Elona', section: '1b' },
  { id: '033', name: 'Frances Jane Talabong', section: '1a' },
  { id: '034', name: 'Francis Jan Aaron Go', section: '1b' },
  { id: '035', name: 'Franz Dalawampo', section: '2b' },
  { id: '036', name: 'Geoffrey Dalumpienes', section: '2a' },
  { id: '037', name: 'Gilcris Mohametano', section: '1b' },
  { id: '038', name: 'Guian Guimba', section: '1c' },
  { id: '039', name: 'Jahra Fabon', section: '1c' },
  { id: '040', name: 'Jana Cuerdo', section: '1b' },
  { id: '041', name: 'Janiel Ashly Mendoza', section: '1b' },
  { id: '042', name: 'Jasper Sam Hao', section: '1a' },
  { id: '043', name: 'Jayvee Garcia', section: '2a' },
  { id: '044', name: 'Jeph Dellosa', section: '1b' },
  { id: '045', name: 'Jet Lee Lim', section: '1c' },
  { id: '046', name: 'Jhaztine Subeldia', section: '1b' },
  { id: '047', name: 'John Axel De Leon', section: '1a' },
  { id: '048', name: 'John Benedict Fernandez', section: '2a' },
  { id: '049', name: 'John Manuel C. Andog', section: '2c' },
  { id: '050', name: 'John Paul Roces', section: '1c' },
  { id: '051', name: 'John Vincent Balane', section: '1c' },
  { id: '052', name: 'Joshua Antioquia', section: '2c' },
  { id: '053', name: 'Joshua Erick M. Japor', section: '2b' },
  { id: '054', name: 'Jp Cabrera', section: '1b' },
  { id: '055', name: 'Karl Oabel', section: '2a' },
  { id: '056', name: 'Kent Amiel Jariel', section: '2c' },
  { id: '057', name: 'Krisha Camille Habilito Cirilo', section: '1b' },
  { id: '058', name: 'Kristin Agrabioso', section: '1b' },
  { id: '059', name: 'Lance Daniel Francisco', section: '1c' },
  { id: '060', name: 'Lester Nalis', section: '2c' },
  { id: '061', name: 'Mark Joseph Perez', section: '1b' },
  { id: '062', name: 'Mark Neji Gregorio', section: '1c' },
  { id: '063', name: 'Nick Ederzon Quebrado', section: '1b' },
  { id: '064', name: 'Oswald Pastorfide', section: '1b' },
  { id: '065', name: 'Princess Diane Salumbides', section: '1b' },
  { id: '066', name: 'Rafael Metran', section: '2a' },
  { id: '067', name: 'Raizere Angelo', section: '1c' },
  { id: '068', name: 'Renz Darrel Arandela', section: '1c' },
  { id: '069', name: 'Rex Enrile', section: '1c' },
  { id: '070', name: 'Rhea Charicce Martija', section: '2b' },
  { id: '071', name: 'Roberto Guevarra Jr.', section: '1a' },
  { id: '072', name: 'Rochelle De Robles', section: '2b' },
  { id: '073', name: 'Ron Angelo Rosel', section: '1a' },
  { id: '074', name: 'Royale Tiffany Lim', section: '1b' },
  { id: '075', name: 'Russel Tiangco', section: '1a' },
  { id: '076', name: 'Sam Alby Berania', section: '1b' },
  { id: '077', name: 'Shawn Gabriel Gamier', section: '2b' },
  { id: '078', name: 'Sean Alonzo', section: '2a' },
  { id: '079', name: 'Shahin De Guzman', section: '1b' },
  { id: '080', name: 'Shaira Joy Calapit', section: '1a' },
  { id: '081', name: 'Sky Abril', section: '1a' },
  { id: '082', name: 'Sofia Maas Capuchino', section: '1b' },
  { id: '083', name: 'Terence Martin A Tarrega', section: '2c' },
  { id: '084', name: 'Trixel Plata', section: '1b' },
  { id: '085', name: 'Venn Marc Gumial', section: '1c' },
  { id: '086', name: 'Wesley Briones', section: '1b' }
];

const Dashboard = ({ users = INITIAL_STUDENTS, attendanceRecords, paymentRecords }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [attendanceFilter, setAttendanceFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState('all')

  // Stats
  const today = new Date().toISOString().split('T')[0]
  const todayAttendance = attendanceRecords.filter(r => r.date === today)
  const presentToday = todayAttendance.filter(r => r.status === 'Present').length
  const lateToday = todayAttendance.filter(r => r.status === 'Late').length
  const absentToday = attendanceRecords.filter(r => r.status === 'Absent').length
  const paidTotal = paymentRecords.filter(r => r.status === 'Paid').reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0)
  const unpaidCount = users.length - new Set(paymentRecords.filter(r => r.status === 'Paid').map(r => r.userId)).size

  // Filtered data
  const filteredAttendance = attendanceRecords.filter(r => {
    const user = users.find(u => u.id === r.student_id || u.id === r.userId)
    const matchesSearch = user && (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.id.includes(searchTerm))
    const matchesFilter = attendanceFilter === 'all' || r.status.toLowerCase() === attendanceFilter.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const filteredPayments = paymentRecords.filter(r => {
    const user = users.find(u => u.id === r.student_id || u.id === r.userId)
    const matchesSearch = user && (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.id.includes(searchTerm))
    const matchesFilter = paymentFilter === 'all' || r.status.toLowerCase() === paymentFilter.toLowerCase()
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Students</h3>
          <p className="text-3xl font-bold text-blue-600">{users.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Present Today</h3>
          <p className="text-3xl font-bold text-green-600">{presentToday}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Paid Total</h3>
          <p className="text-3xl font-bold text-green-600">${paidTotal.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Unpaid</h3>
          <p className="text-3xl font-bold text-red-600">{unpaidCount}</p>
        </div>
      </div>

      {/* All Students Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Students ({users.length})</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Today</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((student) => {
                const todayAtt = attendanceRecords.find(r => r.student_id === student.id && r.date === today)
                const payments = paymentRecords.filter(r => r.student_id === student.id)
                const latestPayment = payments[payments.length - 1]
                const isPaid = latestPayment && latestPayment.status === 'Paid'
                return (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">{student.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{student.section}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        todayAtt?.status === 'Present' ? 'bg-green-100 text-green-800' :
                        todayAtt?.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                        todayAtt?.status === 'Absent' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {todayAtt?.status || 'No record'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {isPaid ? 'Paid' : 'Unpaid'}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Mark Present</button>
                      <button className="text-green-600 hover:text-green-800 text-sm font-medium">Mark Paid</button>
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
