import Instructor  from '../models/instructor.model.js';
import bcrypt from 'bcrypt';

 const seedInstructor = async () => {   
   try {
     const existingInstructor = await Instructor.findOne({ email: process.env.INSTRUCTOR_EMAIL1 }); 
     if (existingInstructor) {
       console.log('✅ !nstructor already exists..');
       return;
      }
    const hashPassword = await bcrypt.hash(process.env.INSTRUCTOR_PASS1, 10);

    const newInstructor = new Instructor({
      fullname: 'Deepu Dev',
      email: process.env.INSTRUCTOR_EMAIL1,
      password: hashPassword,
      role: 'instructor',
      verified: true
    });

    await newInstructor.save();
    console.log('🧑‍💼 Default Instructor created');
  } catch (error) {
    console.error('❌ Error:  default Instructor not created:', error.message);
  }
};

export default seedInstructor