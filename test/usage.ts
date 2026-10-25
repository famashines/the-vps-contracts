import {
  type CommandEnvelopeV1,
  type RegisterStudentCommandPayloadV1,
  type StudentRegisteredEventPayloadV1,
  RegisterStudentCommandPayloadV1Schema,
  type CreateClassSectionCommandPayloadV1,
  type EnrollStudentCommandPayloadV1,
  type UpdateStudentDetailsCommandPayloadV1,
  type ChangeStudentSectionCommandPayloadV1,
  type UpdateClassSectionCommandPayloadV1,
  type UpdateAcademicYearCommandPayloadV1,
  type StudentSectionChangedEventPayloadV1,
} from "../src/index.js";

const payload: RegisterStudentCommandPayloadV1 = {
  firstName: "Ayesha",
  lastName: "Khan",
  fatherName: "Imran Khan",
  dateOfBirth: "2016-03-14",
  gender: "female",
  guardian: { name: "Imran Khan", relation: "father", phone: "+923001234567" },
};

const command: CommandEnvelopeV1 = {
  commandId: "6f1c2d3e-4b5a-4c6d-8e7f-9a0b1c2d3e4f",
  commandType: "admissions.RegisterStudent",
  version: 1,
  issuedAt: "2026-10-25T09:30:00Z",
  issuedBy: "1d2c3b4a-5e6f-4a7b-8c9d-0e1f2a3b4c5d",
  correlationId: "6f1c2d3e-4b5a-4c6d-8e7f-9a0b1c2d3e4f",
  payload,
};

const event: StudentRegisteredEventPayloadV1 = { ...payload, studentId: "0b8e6f3a-6a2e-4f7e-9a51-2f1d3c4b5a69", admissionNumber: "2026-0001" };

const required: readonly string[] = RegisterStudentCommandPayloadV1Schema.required;

// @ts-expect-error wrong field name
const typo: RegisterStudentCommandPayloadV1 = { ...payload, dateofbirth: "2016-03-14" };

// @ts-expect-error gender is only female or male
const badGender: RegisterStudentCommandPayloadV1 = { ...payload, gender: "other" };

// @ts-expect-error the event needs studentId and admissionNumber
const incomplete: StudentRegisteredEventPayloadV1 = payload;

const section: CreateClassSectionCommandPayloadV1 = { academicYearId: "5b1f0e2a-3c4d-4e5f-8a6b-7c8d9e0f1a2b", grade: "class-3", section: "A" };

// @ts-expect-error class-11 is not a grade
const badGrade: CreateClassSectionCommandPayloadV1 = { ...section, grade: "class-11" };

const enroll: EnrollStudentCommandPayloadV1 = { studentId: "0b8e6f3a-6a2e-4f7e-9a51-2f1d3c4b5a69", classSectionId: "9c8b7a6d-5e4f-4a3b-9c2d-1e0f2a3b4c5d" };

// @ts-expect-error the father name is required
const noFather: RegisterStudentCommandPayloadV1 = { firstName: "A", lastName: "B", dateOfBirth: "2016-03-14", gender: "male", guardian: payload.guardian };

const details: UpdateStudentDetailsCommandPayloadV1 = { ...payload, studentId: event.studentId, expectedVersion: 1 };

// @ts-expect-error the edit needs expectedVersion
const noVersion: UpdateStudentDetailsCommandPayloadV1 = { ...payload, studentId: event.studentId };

const move: ChangeStudentSectionCommandPayloadV1 = { enrollmentId: "7d6c5b4a-3e2f-4a1b-8c9d-0e1f2a3b4c5d", expectedVersion: 1, classSectionId: enroll.classSectionId };

const moved: StudentSectionChangedEventPayloadV1 = { ...move, studentId: event.studentId, academicYearId: section.academicYearId, previousClassSectionId: enroll.classSectionId };

const rename: UpdateClassSectionCommandPayloadV1 = { classSectionId: enroll.classSectionId, expectedVersion: 2, grade: "class-3", section: "Blue" };

const year: UpdateAcademicYearCommandPayloadV1 = { academicYearId: section.academicYearId, expectedVersion: 1, name: "2026-27", startsOn: "2026-04-01", endsOn: "2027-03-31" };

export { details, noVersion, move, moved, rename, year, noFather, command, event, required, typo, badGender, incomplete, section, badGrade, enroll };
