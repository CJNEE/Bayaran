import React, { useState } from 'react';

const ExcelUpload = ({ users, setUsers, attendanceRecords, setAttendanceRecords, paymentRecords, setPaymentRecords }) => {
  const [file, setFile] = useState(null);
  const [type, setType] = useState('students');
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult('');
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`http://localhost:8000/api/excel/${type}/`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
      // Refresh data
      await Promise.all([
        type === 'students' && fetchStudents(),
        type === 'attendance' && fetchAttendance(),
        type === 'payments' && fetchPayments(),
      ]);
    } catch (error) {
      setResult('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const fetchStudents = async () => {
    const res = await fetch('http://localhost:8000/api/students/');
    const data = await res.json();
    setUsers(data);
  };

  const fetchAttendance = async () => {
    const res = await fetch('http://localhost:8000/api/attendance/');
    const data = await res.json();
    setAttendanceRecords(data);
  };

  const fetchPayments = async () => {
    const res = await fetch('http://localhost:8000/api/payments/');
    const data = await res.json();
    setPaymentRecords(data);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Excel Upload</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg">
            <option value="students">Students</option>
            <option value="attendance">Attendance</option>
            <option value="payments">Payments</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Excel File</label>
          <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} className="w-full p-3 border border-gray-300 rounded-lg" />
        </div>
        <button 
          onClick={handleUpload} 
          disabled={!file || uploading}
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-400 focus:ring-2 focus:ring-purple-500 transition-all"
        >
          {uploading ? 'Uploading...' : 'Upload Excel'}
        </button>
        {result && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Result:</h4>
            <pre className="text-xs overflow-auto max-h-40">{result}</pre>
          </div>
        )}
      </div>
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium mb-2">Expected Columns:</h4>
        <ul className="text-sm space-y-1">
          {type === 'students' && (
            <>
              <li>• id (string)</li>
              <li>• name (string)</li>
              <li>• section (string, optional)</li>
            </>
          )}
          {type === 'attendance' && (
            <>
              <li>• id (string)</li>
              <li>• date (YYYY-MM-DD)</li>
              <li>• status (Present/Late/Absent)</li>
            </>
          )}
          {type === 'payments' && (
            <>
              <li>• id (string)</li>
              <li>• date (YYYY-MM-DD)</li>
              <li>• amount (number, optional)</li>
              <li>• status (Paid/Unpaid)</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ExcelUpload;

