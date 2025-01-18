export const updateprofile=async (req, res) => {
    if (req.body.email) {
      return res.status(400).json({ message: "You cannot change email" });
    }
  
    const token = req.headers.authorization;
    const { governmentId, hobbies, shortBio } = req.body;
  
    if (!token) {
      return res.status(401).json({ message: "Authorization token is required" });
    }
    try {
      const tokenDetail = jwt.verify(token, process.env.KEY);
      const userExists = await User.findOne({ email: tokenDetail.email });
      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (userExists.hobbies || userExists.shortBio || userExists.governmentId) {
        return res.status(200).json({ message: "Profile already updated"});
      }
        userExists.governmentId = governmentId;
        userExists.hobbies = hobbies;
        userExists.shortBio = shortBio;
        await userExists.save();
  
        // Return updated profile
        return res.status(200).json({ profile: userExists });
      }catch (err) {
      return res.status(500).json({ message: "Error updating profile", error: err.message });
    }
  }