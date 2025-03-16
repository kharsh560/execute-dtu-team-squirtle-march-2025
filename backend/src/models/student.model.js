// Schema code
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  enrollment: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
});

const Student = mongoose.model("Student", studentSchema);

// Insert each student individually
// NOTE: For any new data entry, put it in the format shown below:-

// NOTE: Don't forget these:
// 1) Put the "studentName" in upper case, (for completely new admin)
// 2) For admins, if their detail is in mongodb database, then first of all go to mongoDB and EDIT their existing enrollment as...
// {admin_<nameWithFirstLetterOfEachWordCapital>_<enrollmentNumber>_uniqueIdOfTen(10)Characters}
// For getting unique Id of 10 characters, visit this website:- "https://kh-password-generator.netlify.app/"

const studentData = [
  {
    enrollment: "admin_KumarHarsh_04814811622_ijLJnRgYLL",
    studentName: "KUMAR HARSH",
  },
  {
    enrollment: "admin_SatyaPrakash_05114811622_CAExsPtzaY",
    studentName: "SATYA PRAKASH",
  },
  // {
  //   enrollment: "admin_RaviRanjan_04214811622",
  //   studentName: "Ravi Ranjan",
  // },
];

const insertStudents = async () => {
  try {
    for (const student of studentData) {
      if (!student.enrollment || !student.studentName) {
        console.warn(`Invalid student data:`, student);
        continue; // Skip invalid data
      }

      try {
        await Student.create(student);
        console.log(
          `Inserted student: ${student.enrollment} - ${student.studentName}`
        );
      } catch (err) {
        if (err.code === 11000) {
          console.warn(
            `Duplicate entry for enrollment: ${student.enrollment}. Skipping.`
          );
        } else {
          console.error(`Error inserting student: ${student.enrollment}`, err);
        }
      }
    }
    console.log("Finished inserting student data.");
  } catch (error) {
    console.error("Error in the insertion process:", error);
  }
};
// insertStudents();
// insertStudents(); -> Don't run it here, else run it in index.js just after successful connection.
/*
Inserting around 5000 documents in MongoDB should generally not cause any issues, 
especially if those documents are only accessed during the signup process and not 
during sign-in. MongoDB can handle much larger datasets without performance issues.
*/

export { Student, insertStudents };
