const ServiceFailureAlert = ({ children }) => {
  return (
    <div className="error-alert p-4 mb-6" role="alert">
      <p className="eyebrow error-alert__header weight-brand-bold mb-2 text-uppercase">Error</p>
      <p className="mb-0">{children}</p>
    </div>
  );
};

export default ServiceFailureAlert;
