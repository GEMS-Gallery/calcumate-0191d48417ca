import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Doughnut } from 'react-chartjs-2';
import { backend } from 'declarations/backend';
import KeyMetrics from './components/KeyMetrics';
import LeadsTable from './components/LeadsTable';
import EmailsTable from './components/EmailsTable';
import ProposalsTable from './components/ProposalsTable';

const DashboardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: 'auto',
  maxWidth: 1200,
}));

const ChartContainer = styled(Box)({
  height: 300,
});

const App: React.FC = () => {
  const [countryData, setCountryData] = useState<{ labels: string[], data: number[] }>({ labels: [], data: [] });
  const [emailData, setEmailData] = useState<{ labels: string[], data: number[] }>({ labels: [], data: [] });
  const [showOnlyNewLeads, setShowOnlyNewLeads] = useState(false);
  const [showEmails, setShowEmails] = useState(false);
  const [showProposals, setShowProposals] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const countryResult = await backend.getCountryData();
      const emailResult = await backend.getEmailData();

      setCountryData({
        labels: countryResult.map(([label, _]) => label),
        data: countryResult.map(([_, value]) => Number(value)),
      });

      setEmailData({
        labels: emailResult.map(([label, _]) => label),
        data: emailResult.map(([_, value]) => Number(value)),
      });
    };

    fetchData();
  }, []);

  const handleNewLeadsClick = () => {
    setShowOnlyNewLeads(!showOnlyNewLeads);
    setShowEmails(false);
    setShowProposals(false);
  };

  const handleEmailsClick = () => {
    setShowEmails(!showEmails);
    setShowOnlyNewLeads(false);
    setShowProposals(false);
  };

  const handleProposalsClick = () => {
    setShowProposals(!showProposals);
    setShowOnlyNewLeads(false);
    setShowEmails(false);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: 'background.default' }}>
      <DashboardPaper elevation={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <KeyMetrics 
              onNewLeadsClick={handleNewLeadsClick} 
              onEmailsClick={handleEmailsClick} 
              onProposalsClick={handleProposalsClick}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Lead by Countries</Typography>
            <ChartContainer>
              <Doughnut
                data={{
                  labels: countryData.labels,
                  datasets: [{
                    data: countryData.data,
                    backgroundColor: ['#635bff', '#32325d', '#3ecf8e', '#f6bc13', '#ed5f74', '#6772e5'],
                  }],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom' as const,
                    },
                  },
                }}
              />
            </ChartContainer>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Email Sent</Typography>
            <ChartContainer>
              <Doughnut
                data={{
                  labels: emailData.labels,
                  datasets: [{
                    data: emailData.data,
                    backgroundColor: ['#635bff', '#e3e8ee'],
                  }],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom' as const,
                    },
                  },
                }}
              />
            </ChartContainer>
          </Grid>
          <Grid item xs={12}>
            {showEmails ? (
              <EmailsTable />
            ) : showProposals ? (
              <ProposalsTable />
            ) : (
              <LeadsTable showOnlyNewLeads={showOnlyNewLeads} />
            )}
          </Grid>
        </Grid>
      </DashboardPaper>
    </Box>
  );
};

export default App;