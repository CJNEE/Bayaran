const initialStudents = [
  { id: '001', name: 'Adrian De Mesa', section: '1b' },
  { id: '002', name: 'Adrian Neil Afuang', section: '1b' },
  { id: '003', name: 'Ailyn Canillo', section: '2c' },
  // ... all 86 students as before
];

if (typeof window !== 'undefined') {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(initialStudents));
  }
}

export default initialStudents;

