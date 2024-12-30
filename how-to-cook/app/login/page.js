"use client";

import { useState } from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form>
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        id="firstNae"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        id="lastNae"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
    </form>
  );
}
