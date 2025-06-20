import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!role) {
      alert('Pilih peran terlebih dahulu');
      return;
    }

    // Simpan role ke localStorage
    localStorage.setItem('role', role);

    // Redirect berdasarkan role
    switch (role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'siswa':
        navigate('/siswa');
        break;
      case 'guru':
        navigate('/guru'); // pastikan route /guru sudah dibuat
        break;
      case 'orangtua':
        navigate('/orangtua'); // pastikan route /orangtua sudah dibuat
        break;
      default:
        navigate('/');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      fontFamily: 'Segoe UI, sans-serif',
    },
    leftPanel: {
      flex: 1,
      backgroundColor: '#C3E0FF',
      position: 'relative',
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    logo: {
      width: '120px',
      position: 'absolute',
      top: '20px',
      left: '20px',
    },
    leftTextWrapper: {
      textAlign: 'left',
      maxWidth: '300px',
      marginLeft: '20px',
    },
    leftTitle: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    leftSubtitle: {
      fontSize: '1rem',
      color: '#333',
    },
    rightPanel: {
      flex: 1,
      backgroundColor: '#ffffff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    illustration: {
      width: '100px',
      marginBottom: '1px',
    },
    title: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    input: {
      width: '100%',
      maxWidth: '280px',
      padding: '10px',
      margin: '8px 0',
      borderRadius: '8px',
      border: '1px solid #ccc',
    },
    button: {
      width: '100%',
      maxWidth: '280px',
      padding: '10px',
      marginTop: '15px',
      backgroundColor: '#4C9AFF',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    footer: {
      marginTop: '15px',
      fontSize: '0.9rem',
      textAlign: 'center',
      maxWidth: '280px',
    },
    socialLogin: {
      marginTop: '10px',
      display: 'flex',
      justifyContent: 'space-around',
      maxWidth: '280px',
    },
    icon: {
      width: '25px',
      cursor: 'pointer',
    },
    link: {
      color: '#4C9AFF',
      textDecoration: 'none',
      fontSize: '0.9rem',
    },
    forgotPassword: {
      textAlign: 'right',
      width: '100%',
      maxWidth: '280px',
    },
  };

  return (
    <div style={styles.container}>
      {/* LEFT PANEL */}
      <div style={styles.leftPanel}>
        <img src="/images/ppm-prambanan.png" alt="Logo PPM" style={styles.logo} />
        <div style={styles.leftTextWrapper}>
          <div style={styles.leftTitle}>Welcome to Your Login’s Form</div>
          <div style={styles.leftSubtitle}>Sistem Informasi Akademik MBS Prambanan</div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={styles.rightPanel}>
        <img src="/images/icon-login-.png" alt="Login Icon" style={styles.illustration} />
        <div style={styles.title}>Welcome back</div>
        <p style={{ fontSize: '0.9rem' }}>Login to your account</p>

        <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.input}>
          <option value="">Choose your user</option>
          <option value="admin">Admin</option>
          <option value="guru">Guru</option>
          <option value="siswa">Siswa</option>
          <option value="orangtua">Orang Tua</option>
        </select>

        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <div style={styles.forgotPassword}>
          <a href="#" style={styles.link}>Forgot Password?</a>
        </div>

        <button onClick={handleLogin} style={styles.button}>Log In</button>

        <div style={styles.footer}>
          OR
          <div style={styles.socialLogin}>
            <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google" style={styles.icon} />
            <img src="https://cdn-icons-png.flaticon.com/512/732/732221.png" alt="Apple" style={styles.icon} />
          </div>
          <p style={{ marginTop: '10px' }}>
            Don’t have an account? <a href="#" style={styles.link}>Create Account</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
