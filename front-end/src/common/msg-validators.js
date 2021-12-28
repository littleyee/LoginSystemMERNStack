export const vmsg_text = value => {
    if (value.length < 0 || value.length > 10) {
        return (
            <div className="alert alert-danger" role="alert">
                The msg text should be a text and must be between 0 and 10 characters long.
            </div>
        );
    }
  };
  
  