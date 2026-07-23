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
}: {
  label: string;
  name: string;
  required?: boolean;
  currentImageUrl?: string;
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
          alt="Gambar saat ini"
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
        <p className="text-xs text-secondary mt-1">Kosongkan jika tidak ingin mengganti gambar.</p>
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
