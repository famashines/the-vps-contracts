import {
  type CommandEnvelopeV1,
  type RegisterStudentCommandPayloadV1,
  type StudentRegisteredEventPayloadV1,
  RegisterStudentCommandPayloadV1Schema,
  type OpenClassCommandPayloadV1,
  type EnrollStudentCommandPayloadV1,
  type UpdateStudentDetailsCommandPayloadV1,
  type ChangeStudentClassCommandPayloadV1,
  type CloseClassCommandPayloadV1,
  type UpdateAcademicYearCommandPayloadV1,
  type StudentClassChangedEventPayloadV1,
  type MoneyV1,
  type ReceivePaymentCommandPayloadV1,
  type FeeChargedEventPayloadV1,
  SetFeeScheduleCommandPayloadV1Schema,
  type MarkStudentLeftCommandPayloadV1,
  type StudentLeftEventPayloadV1,
  type CancelStudentLeavingCommandPayloadV1,
  type StudentLeavingCancelledEventPayloadV1,
} from "../src/index.js";

const payload: RegisterStudentCommandPayloadV1 = {
  firstName: "Ayesha",
  lastName: "Khan",
  fatherName: "Imran Khan",
  dateOfBirth: "2016-03-14",
  gender: "female",
  guardian: { name: "Imran Khan", relation: "father", phone: "+923001234567", cnic: "35202-7654321-9" },
  bFormNumber: "35202-1234567-8",
  address: "House 12, Street 4, Gulberg III, Lahore",
  familyStatus: "father-deceased",
  familyStatusNote: "The uncle pays the fees.",
  siblings: { count: 2, studentIds: ["0b9f6c1e-6a4e-4c3e-9a51-2f0f0e3b7d11"] },
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

const oldEvent: StudentRegisteredEventPayloadV1 = {
  studentId: event.studentId,
  admissionNumber: "2025-0001",
  firstName: "Ali",
  lastName: "Raza",
  fatherName: "Raza Ahmed",
  dateOfBirth: "2015-01-02",
  gender: "male",
  guardian: { name: "Raza Ahmed", relation: "father", phone: "+923001234568" },
};

const linked: string[] = ["0b9f6c1e-6a4e-4c3e-9a51-2f0f0e3b7d11"];
const withLinks: RegisterStudentCommandPayloadV1 = { ...payload, siblings: { count: 1, studentIds: linked } };

// @ts-expect-error the registration needs the address
const noAddress: RegisterStudentCommandPayloadV1 = { ...payload, address: undefined };

// @ts-expect-error orphan is not a family status
const badStatus: RegisterStudentCommandPayloadV1 = { ...payload, familyStatus: "orphan" };

// @ts-expect-error the event needs studentId and admissionNumber
const incomplete: StudentRegisteredEventPayloadV1 = payload;

const section: OpenClassCommandPayloadV1 = { academicYearId: "5b1f0e2a-3c4d-4e5f-8a6b-7c8d9e0f1a2b", grade: "kg-1" };

// @ts-expect-error nursery is not a grade
const badGrade: OpenClassCommandPayloadV1 = { ...section, grade: "nursery" };

// @ts-expect-error a class has no section
const withSection: OpenClassCommandPayloadV1 = { ...section, section: "A" };

const enroll: EnrollStudentCommandPayloadV1 = { studentId: "0b8e6f3a-6a2e-4f7e-9a51-2f1d3c4b5a69", classId: "9c8b7a6d-5e4f-4a3b-9c2d-1e0f2a3b4c5d" };

// @ts-expect-error the father name is required
const noFather: RegisterStudentCommandPayloadV1 = { firstName: "A", lastName: "B", dateOfBirth: "2016-03-14", gender: "male", guardian: payload.guardian };

const details: UpdateStudentDetailsCommandPayloadV1 = { ...payload, studentId: event.studentId, expectedVersion: 1 };

// @ts-expect-error the edit needs expectedVersion
const noVersion: UpdateStudentDetailsCommandPayloadV1 = { ...payload, studentId: event.studentId };

const move: ChangeStudentClassCommandPayloadV1 = { enrollmentId: "7d6c5b4a-3e2f-4a1b-8c9d-0e1f2a3b4c5d", expectedVersion: 1, classId: enroll.classId };

const moved: StudentClassChangedEventPayloadV1 = { ...move, studentId: event.studentId, academicYearId: section.academicYearId, previousClassId: enroll.classId };

const rename: CloseClassCommandPayloadV1 = { classId: enroll.classId, expectedVersion: 2 };

const year: UpdateAcademicYearCommandPayloadV1 = { academicYearId: section.academicYearId, expectedVersion: 1, name: "2026-27", startsOn: "2026-04-01", endsOn: "2027-03-31" };

const fee: MoneyV1 = { amount: 450000, currency: "PKR" };

// @ts-expect-error only PKR
const dollars: MoneyV1 = { amount: 450000, currency: "USD" };

const pay: ReceivePaymentCommandPayloadV1 = { accountId: section.academicYearId, amount: fee, method: "cash" };

// @ts-expect-error cash only
const card: ReceivePaymentCommandPayloadV1 = { ...pay, method: "card" };

const charged: FeeChargedEventPayloadV1 = { chargeId: enroll.studentId, accountId: pay.accountId, kind: "monthly", month: "2026-11", amount: fee, dueOn: "2026-11-10" };

const scheduleRequired: readonly string[] = SetFeeScheduleCommandPayloadV1Schema.required;

const leave: MarkStudentLeftCommandPayloadV1 = { studentId: event.studentId, expectedVersion: 2, leftOn: "2026-09-15", reason: "Family moved to Lahore" };

// @ts-expect-error the leave needs leftOn
const noLeftOn: MarkStudentLeftCommandPayloadV1 = { studentId: event.studentId, expectedVersion: 2 };

const left: StudentLeftEventPayloadV1 = { studentId: event.studentId, leftOn: leave.leftOn };

const cancelLeave: CancelStudentLeavingCommandPayloadV1 = { studentId: event.studentId, expectedVersion: 3 };

const leaveCancelled: StudentLeavingCancelledEventPayloadV1 = { studentId: event.studentId, leftOn: leave.leftOn };

export { leave, noLeftOn, left, cancelLeave, leaveCancelled, fee, dollars, pay, card, charged, scheduleRequired, details, noVersion, move, moved, rename, year, noFather, command, event, required, typo, badGender, incomplete, section, badGrade, withSection, enroll };
