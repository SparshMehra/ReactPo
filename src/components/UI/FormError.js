/**
 * FormError Component
 *
 * @file FormError.js
 * @author Abdiaziz Muse (A00471783) - UI revamp, accessibility, cleanup
 * @author Bhabin Chudal (A00464169) - UI improvements
 * @description Small helper to render accessible form error messages consistently.
 */
export default function FormError({ children }) {
  return (
    <p role="alert" className="text-red-600 mt-1 text-sm">
      {children}
    </p>
  );
}