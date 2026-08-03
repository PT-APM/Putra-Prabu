"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-4 py-2.5 text-on-background focus:outline-none focus:ring-2 focus:ring-primary/40";
const labelClass =
  "block font-label-sm text-label-sm text-secondary mb-1 uppercase tracking-wide";

export function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  required,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        rows={rows}
        className={inputClass}
      />
    </div>
  );
}

export function ImageInput({
  label,
  name,
  required,
  currentImageUrl,
  currentImageLabel = "Gambar saat ini",
  keepImageHint = "Kosongkan jika tidak ingin mengganti gambar.",
}: {
  label: string;
  name: string;
  required?: boolean;
  currentImageUrl?: string;
  currentImageLabel?: string;
  keepImageHint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      {currentImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={currentImageUrl}
          alt={currentImageLabel}
          className="mb-2 w-32 h-24 object-cover rounded-lg border border-outline-variant/40"
        />
      )}
      <input
        id={name}
        name={name}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        required={required}
        className="w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-4 py-2.5 text-on-background file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-on-primary file:font-medium file:cursor-pointer cursor-pointer"
      />
      {currentImageUrl && (
        <p className="text-xs text-secondary mt-1">{keepImageHint}</p>
      )}
    </div>
  );
}

export function Select({
  label,
  name,
  defaultValue,
  required,
  options,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className={inputClass}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

type ContentLang = "Id" | "En" | "Ar";

// A field with one input per content language (id/en/ar), rendered as tabs.
// All three inputs stay mounted (hidden via CSS) so switching tabs never
// loses what was typed. Only the Indonesian ("Id") value is required —
// English/Arabic translations are optional, with the repository layer
// falling back to Indonesian when they're empty.
export function TranslatedField({
  baseName,
  label,
  tabLabels,
  defaultValues,
  required,
  placeholder,
  multiline,
  rows = 4,
}: {
  baseName: string;
  label: string;
  tabLabels: { id: string; en: string; ar: string };
  defaultValues?: { id?: string; en?: string; ar?: string };
  required?: boolean;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}) {
  const [tab, setTab] = useState<ContentLang>("Id");
  const tabs: { key: ContentLang; dictKey: "id" | "en" | "ar"; label: string }[] = [
    { key: "Id", dictKey: "id", label: tabLabels.id },
    { key: "En", dictKey: "en", label: tabLabels.en },
    { key: "Ar", dictKey: "ar", label: tabLabels.ar },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
        <label className={`${labelClass} mb-0`}>{label}</label>
        <div className="flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                tab === t.key
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-low text-secondary hover:bg-surface-container"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      {tabs.map((t) => {
        const name = `${baseName}${t.key}`;
        const defaultValue = defaultValues?.[t.dictKey];
        const hidden = tab !== t.key;
        return multiline ? (
          <textarea
            key={name}
            id={name}
            name={name}
            defaultValue={defaultValue}
            required={t.key === "Id" && required}
            placeholder={placeholder}
            rows={rows}
            hidden={hidden}
            className={inputClass}
          />
        ) : (
          <input
            key={name}
            id={name}
            name={name}
            type="text"
            defaultValue={defaultValue}
            required={t.key === "Id" && required}
            placeholder={placeholder}
            hidden={hidden}
            className={inputClass}
          />
        );
      })}
    </div>
  );
}
