import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

// Where the OpenAPI spec is loaded from. Defaults to the hand-written file in public/,
// override with VITE_OPENAPI_URL (e.g. /v3/api-docs once the Spring backend generates it).
const SPEC_URL = import.meta.env.VITE_OPENAPI_URL || '/openapi.yaml';

function ApiDocs() {
  return <SwaggerUI url={SPEC_URL} docExpansion="list" tryItOutEnabled />;
}

export default ApiDocs;
