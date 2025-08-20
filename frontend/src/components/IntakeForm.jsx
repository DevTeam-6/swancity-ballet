'use client';

import { useState } from "react";
import { Input, Textarea, Button } from "@rewind-ui/core";

const FormField = ({ label, name, children }) => (
  <div className="flex flex-col space-y-1">
    <label htmlFor={name} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    {children}
  </div>
);

export default function IntakeForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    emergencyContact: "",
    dob: "",
    referral: "",
    danceStyles: "",
    healthNotes: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | "success" | "error"

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("http://localhost:5000/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to submit form");

      await res.json();
      setStatus("success");

      // Reset form
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        emergencyContact: "",
        dob: "",
        referral: "",
        danceStyles: "",
        healthNotes: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-4 border rounded-lg overflow-y-auto"
    >
      <h2 className="text-2xl font-bold text-black">New Client Intake Form</h2>

      <FormField label="First Name" name="firstName">
        <Input
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
      </FormField>

      <FormField label="Last Name" name="lastName">
        <Input
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
      </FormField>

      <FormField label="Email" name="email">
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </FormField>

      <FormField label="Phone" name="phone">
        <Input
          id="phone"
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
      </FormField>

      <FormField label="Emergency Contact" name="emergencyContact">
        <Input
          id="emergencyContact"
          name="emergencyContact"
          placeholder="Emergency Contact"
          value={form.emergencyContact}
          onChange={handleChange}
          required
        />
      </FormField>

      <FormField label="Date of Birth" name="dob">
        <Input
          id="dob"
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          required
        />
      </FormField>

      <FormField label="How did you hear about us?" name="referral">
        <Input
          id="referral"
          name="referral"
          placeholder="Please explain here."
          value={form.referral}
          onChange={handleChange}
        />
      </FormField>

      <FormField label="Preferred Dance Style(s)" name="danceStyles">
        <select
          id="danceStyles"
          name="danceStyles"
          value={form.danceStyles}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="">Select style</option>
          <option value="ballet">Ballet</option>
          <option value="hiphop">Hip-Hop</option>
          <option value="jazz">Jazz</option>
          <option value="tap">Tap</option>
          <option value="contemporary">Contemporary</option>
        </select>
      </FormField>

      <FormField label="Health Considerations / Injuries" name="healthNotes">
        <Textarea
          id="healthNotes"
          name="healthNotes"
          value={form.healthNotes}
          onChange={handleChange}
        />
      </FormField>

      <Button type="submit" color="blue" fullwidth="true" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>

      {status === "success" && (
        <p className="text-green-600 font-medium">Form submitted successfully!</p>
      )}
      {status === "error" && (
        <p className="text-red-600 font-medium">Error submitting form. Please try again.</p>
      )}
    </form>
  );
}
