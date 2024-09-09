import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const MetricPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
  cursor: 'pointer',
}));

interface KeyMetricsProps {
  metrics: {
    newLeads: number;
    emails: number;
    proposals: number;
    appointments: number;
  };
  onNewLeadsClick: () => void;
  onEmailsClick: () => void;
  onProposalsClick: () => void;
  onAppointmentsClick: () => void;
}

const KeyMetrics: React.FC<KeyMetricsProps> = ({ metrics, onNewLeadsClick, onEmailsClick, onProposalsClick, onAppointmentsClick }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Key Metrics</Typography>
      </Grid>
      <Grid item xs={6} sm={3}>
        <MetricPaper onClick={onNewLeadsClick}>
          <Typography variant="h4" color="primary">{metrics.newLeads}</Typography>
          <Typography variant="body2">New Leads</Typography>
        </MetricPaper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <MetricPaper onClick={onEmailsClick}>
          <Typography variant="h4" color="primary">{metrics.emails}</Typography>
          <Typography variant="body2">Emails</Typography>
        </MetricPaper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <MetricPaper onClick={onProposalsClick}>
          <Typography variant="h4" color="primary">{metrics.proposals}</Typography>
          <Typography variant="body2">Proposals</Typography>
        </MetricPaper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <MetricPaper onClick={onAppointmentsClick}>
          <Typography variant="h4" color="primary">{metrics.appointments}</Typography>
          <Typography variant="body2">Appointments</Typography>
        </MetricPaper>
      </Grid>
    </Grid>
  );
};

export default KeyMetrics;