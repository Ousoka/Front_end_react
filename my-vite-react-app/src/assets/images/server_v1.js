


app.put('/api/update_password', async (req, res) => {
  const { user_cp, userPassword, newPassword } = req.body;
  console.log('Received data:', req.body);

  try {

    // Generate a salt and hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const updateQuery = `
      UPDATE etudiants 
      SET etudiant_code_secret = ?
      WHERE etudiant_cp = ?
    `;

    // Log the hashed password for debugging
    console.log('Hashed password:', hashedPassword);

    pool.query(updateQuery, [hashedPassword, user_cp], (error, results) => {
      if (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({ error: 'Database query failed' });
      }

      if (results.affectedRows === 0) {
        console.log('No rows affected, user not found');
        return res.status(404).json({ error: 'User not found' });
      }

      console.log('Password updated successfully');
      res.status(200).json({ message: 'Password updated successfully' });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/update_password_surveillant', async (req, res) => {
  const { user_phone, userPassword, newPassword } = req.body;
  console.log('Received data:', req.body);

  try {

    // Generate a salt and hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const updateQuery = `
      UPDATE surveillants 
      SET surveillant_code_secret = ?
      WHERE surveillant_telephone = ?
    `;

    // Log the hashed password for debugging
    console.log('Hashed password:', hashedPassword);

    pool.query(updateQuery, [hashedPassword, user_phone], (error, results) => {
      if (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({ error: 'Database query failed' });
      }

      if (results.affectedRows === 0) {
        console.log('No rows affected, user not found');
        return res.status(404).json({ error: 'User not found' });
      }

      console.log('Password updated successfully');
      res.status(200).json({ message: 'Password updated successfully' });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/update_password_securite', async (req, res) => {
  const { user_phone, userPassword, newPassword } = req.body;
  console.log('Received data:', req.body);

  try {

    // Generate a salt and hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const updateQuery = `
      UPDATE securite 
      SET securite_code_secret = ?
      WHERE securite_telephone = ?
    `;

    // Log the hashed password for debugging
    console.log('Hashed password:', hashedPassword);

    pool.query(updateQuery, [hashedPassword, user_phone], (error, results) => {
      if (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({ error: 'Database query failed' });
      }

      if (results.affectedRows === 0) {
        console.log('No rows affected, user not found');
        return res.status(404).json({ error: 'User not found' });
      }

      console.log('Password updated successfully');
      res.status(200).json({ message: 'Password updated successfully' });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// <=======================================================================================================>




// <=======================================================================================================>
// <===================================================START SERVER============================================>
// <=======================================================================================================>


// // Start the server
app.listen(port, '10.163.9.208', () => {
  console.log(`Server is running on: 10.163.9.208:${port}`);
});
