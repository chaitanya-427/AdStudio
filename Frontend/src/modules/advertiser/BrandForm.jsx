import React, { useState } from "react";
import { ENDPOINTS } from "../../api/endpoints.js";

/* ---------------------------------------------------------------------- */
/*  Brand create/edit form                                                */
/* ---------------------------------------------------------------------- */
export default function BrandForm({ initial, advertisers, onCancel, onSaved }) {
  const isEdit = Boolean(initial?.id);
  const [form, setForm] = useState({
    brandName: initial?.brandName || "",
    category: initial?.category || "",
    advertiserId: initial?.advertiserId || (advertisers?.[0]?.id ?? ""),
    allocatedBudget: initial?.allocatedBudget ?? "",
    spentToDate: initial?.spentToDate ?? 0,
    status: initial?.status || "ACTIVE",
    color: initial?.color || "#6366F1",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const url = isEdit ? `${ENDPOINTS.brands}/${initial.id}` : ENDPOINTS.brands;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          allocatedBudget: Number(form.allocatedBudget),
          spentToDate: Number(form.spentToDate),
        }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const saved = await res.json();
      onSaved(saved);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="form-grid">
      <label className="field">
        <span>Brand name</span>
        <input required value={form.brandName} onChange={set("brandName")} placeholder="Solstice" />
      </label>
      <label className="field">
        <span>Category</span>
        <input required value={form.category} onChange={set("category")} placeholder="Beverages" />
      </label>
      <label className="field">
        <span>Advertiser</span>
        <select required value={form.advertiserId} onChange={set("advertiserId")}>
          {(advertisers || []).map((a) => (
            <option key={a.id} value={a.id}>{a.companyName}</option>
          ))}
        </select>
      </label>
      <div className="field-row">
        <label className="field">
          <span>Allocated budget</span>
          <input required type="number" min="0" step="0.01" value={form.allocatedBudget} onChange={set("allocatedBudget")} />
        </label>
        <label className="field">
          <span>Spent to date</span>
          <input type="number" min="0" step="0.01" value={form.spentToDate} onChange={set("spentToDate")} />
        </label>
      </div>
      <div className="field-row">
        <label className="field">
          <span>Status</span>
          <select value={form.status} onChange={set("status")}>
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </label>
        <label className="field">
          <span>Color</span>
          <input type="color" value={form.color} onChange={set("color")} />
        </label>
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="modal-actions">
        <button type="button" className="btn btn-ghost btn-sm" onClick={onCancel} disabled={saving}>Cancel</button>
        <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>
          {saving ? "Saving..." : isEdit ? "Save changes" : "Create brand"}
        </button>
      </div>
    </form>
  );
}
