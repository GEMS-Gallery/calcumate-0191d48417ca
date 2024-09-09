import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { backend } from 'declarations/backend';

const MetricPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
  cursor: 'pointer',
}));

interface KeyMetricsProps {
  onNewLeadsClick: () => void;
  onEmailsClick: () => void;
}

const KeyMetrics: React.FC<KeyMetricsProps> = ({ onNewLeadsClick, onEmailsClick }) => {
  const [metrics, setMetrics] = useState({
    newLeads: 0,
    emails: 0,
    proposals: 0,
    appointments: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      const result = await backend.getMetrics();
      setMetrics(result);
    };

    fetchMetrics();
  }, []);

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
        <MetricPaper>
          <Typography variant="h4" color="primary">{metrics.proposals}</Typography>
          <Typography variant="body2">Proposals</Typography>
        </MetricPaper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <MetricPaper>
          <Typography variant="h4" color="primary">{metrics.appointments}</Typography>
          <Typography variant="body2">Appointments</Typography>
        </MetricPaper>
      </Grid>
    </Grid>
  );
};

export default KeyMetrics;