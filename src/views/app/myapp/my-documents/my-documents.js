import React from 'react';
import AdmissionDocuments from './admission-documents';
import FinancialDocumets from './financial-documents';
import SupportingDocuments from './supporting-documents';

const MyDocuments = () => {
  return (
    <div>
      <h1>MyDocuments</h1>
      <AdmissionDocuments />
      <FinancialDocumets />
      <SupportingDocuments />
    </div>
  );
};
export default MyDocuments;
