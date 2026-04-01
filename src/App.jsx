import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'

const title = "CJ ATTENDANCE & PAYMENT SYSTEM";
import AddEmployeeForm from './components/AddEmployeeForm.jsx'
import AttendanceTable from './components/AttendanceTable.jsx'
import PaymentTable from './components/PaymentTable.jsx'
import Dashboard from './components/Dashboard.jsx'
import ExcelUpload from './components/ExcelUpload.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import axios from 'axios'

// Initial 86 students (fallback)
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

function App() {
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'login')
  const [users, setUsers] = useState([])
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [paymentRecords, setPaymentRecords] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [isAuthenticated, setIsAuthenticated] = useState(!!token)

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  // API config
  const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
      Authorization: token ? `Token ${token}` : '',
    },
  });

  const fetchData = async () => {
    try {
      const [usersRes, attRes, payRes] = await Promise.all([
        api.get('students/'),
        api.get('attendance/'),
        api.get('payments/'),
      ]);
      setUsers(usersRes.data);
      setAttendanceRecords(attRes.data);
      setPaymentRecords(payRes.data);
    } catch (error) {
      console.error('API error:', error);
      // Fallback to local
      const savedUsers = localStorage.getItem('users')
      if (savedUsers) setUsers(JSON.parse(savedUsers))
    }
  };

  useEffect(() => {
    if (token && isAuthenticated) {
      api.defaults.headers.Authorization = `Token ${token}`;
      fetchData();
    } else if (!isAuthenticated) {
      // Local fallback
      const savedUsers = localStorage.getItem('users')
      if (savedUsers) setUsers(JSON.parse(savedUsers));
    }
  }, [token, isAuthenticated]);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    localStorage.setItem('activeTab', 'dashboard');
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setActiveTab('login');
  };

  /* Login/Register removed - direct dashboard if token exists */

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
<div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-lg">
        <h1 className="text-3xl font-bold text-center md:text-4xl lg:text-5xl">{title}</h1>
      </div>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      <main className="p-6 md:p-8">
        {activeTab === 'add-employee' && (
          <AddEmployeeForm users={users} setUsers={setUsers} />
        )}
        {activeTab === 'all-students' && (
          <AllStudents users={users} />
        )}
        {activeTab === 'dashboard' && (
          <Dashboard users={users} attendanceRecords={attendanceRecords} paymentRecords={paymentRecords} />
        )}
        {activeTab === 'attendance' && (
          <AttendanceTable 
            users={users} 
            attendanceRecords={attendanceRecords} 
            setAttendanceRecords={setAttendanceRecords} 
          />
        )}
        {activeTab === 'payment' && (
          <PaymentTable 
            users={users} 
            paymentRecords={paymentRecords} 
            setPaymentRecords={setPaymentRecords} 
          />
        )}
        {activeTab === 'excel' && (
          <ExcelUpload 
            users={users} setUsers={setUsers}
            attendanceRecords={attendanceRecords} setAttendanceRecords={setAttendanceRecords}
            paymentRecords={paymentRecords} setPaymentRecords={setPaymentRecords}
          />
        )}
      </main>
    </div>
  )
}

export default App
