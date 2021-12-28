export const vinsurance_amount = value => {
    if (value.length < 0 || value.length > 10) {
        return (
            <div className="alert alert-danger" role="alert">
                The insurance amount should be a positive quantity and must be between 0 and 10 characters long.
            </div>
        );
    }
  };
  
  