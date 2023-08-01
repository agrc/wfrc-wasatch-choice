import PropTypes from 'prop-types';
import { Collapse, Button, CardBody, CardHeader, Card } from 'reactstrap';
import { useState } from 'react';

export default function ErrorFallback({ error }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="d-flex h-100 w-100 align-items-center justify-content-center">
      <Card className="w-50">
        <CardHeader className="text-bg-danger">
          <h3 className="m-0">Something went wrong</h3>
        </CardHeader>
        <CardBody>
          <p className="mt-1">{error?.message ?? 'An unknown error occurred. Please try again.'}</p>
          <div className="d-flex w-100 align-items-center justify-content-between mb-3">
            <Button color="primary" onClick={() => setShowDetails(!showDetails)}>
              Show technical details 🤓
            </Button>
            <Button color="primary" onClick={() => window.location.reload()}>
              Reload
            </Button>
          </div>
          <Collapse isOpen={showDetails}>
            <Card>
              <CardBody>
                <pre>{error?.stack}</pre>
              </CardBody>
            </Card>
          </Collapse>
        </CardBody>
      </Card>
    </div>
  );
}

ErrorFallback.propTypes = {
  error: PropTypes.object,
};
