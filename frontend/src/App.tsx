import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { Doughnut } from 'react-chartjs-2';
import { backend } from 'declarations/backend';
import KeyMetrics from './components/KeyMetrics';
import LeadsTable from './components/LeadsTable';
import EmailsTable from './components/EmailsTable';
import ProposalsTable from './components/ProposalsTable';
import AppointmentsTable from './components/AppointmentsTable';

const DashboardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: 'auto',
  maxWidth: 1200,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const ChartContainer = styled(Box)({
  height: 300,
  [theme.breakpoints.down('sm')]: {
    height: 200,
  },
});

const App: React.FC = () => {
  const [countryData, setCountryData] = useState<{ labels: string[], data: number[] }>({ labels: [], data: [] });
  const [emailData, setEmailData] = useState<{ labels: string[], data: number[] }>({ labels: [], data: [] });
  const [showOnlyNewLeads, setShowOnlyNewLeads] = useState(false);
  const [showEmails, setShowEmails] = useState(false);
  const [showProposals, setShowProposals] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [metrics, setMetrics] = useState<{
    newLeads: number;
    emails: number;
    proposals: number;
    appointments: number;
  }>({ newLeads: 0, emails: 0, proposals: 0, appointments: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [countryResult, emailResult, metricsResult] = await Promise.all([
          backend.getCountryData(),
          backend.getEmailData(),
          backend.getMetrics()
        ]);

        setCountryData({
          labels: countryResult.map(([label, _]) => label),
          data: countryResult.map(([_, value]) => Number(value)),
        });

        setEmailData({
          labels: emailResult.map(([label, _]) => label),
          data: emailResult.map(([_, value]) => Number(value)),
        });

        setMetrics({
          newLeads: Number(metricsResult.newLeads),
          emails: Number(metricsResult.emails),
          proposals: Number(metricsResult.proposals),
          appointments: Number(metricsResult.appointments),
        });
        console.log('Fetched metrics:', metricsResult);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Current metrics state:', metrics);
  }, [metrics]);

  const handleNewLeadsClick = () => {
    setShowOnlyNewLeads(!showOnlyNewLeads);
    setShowEmails(false);
    setShowProposals(false);
    setShowAppointments(false);
    setDrawerOpen(false);
  };

  const handleEmailsClick = () => {
    setShowEmails(!showEmails);
    setShowOnlyNewLeads(false);
    setShowProposals(false);
    setShowAppointments(false);
    setDrawerOpen(false);
  };

  const handleProposalsClick = () => {
    setShowProposals(!showProposals);
    setShowOnlyNewLeads(false);
    setShowEmails(false);
    setShowAppointments(false);
    setDrawerOpen(false);
  };

  const handleAppointmentsClick = () => {
    setShowAppointments(!showAppointments);
    setShowOnlyNewLeads(false);
    setShowEmails(false);
    setShowProposals(false);
    setDrawerOpen(false);
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CRM Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List>
          <ListItem button onClick={handleNewLeadsClick}>
            <ListItemText primary="Leads" />
          </ListItem>
          <ListItem button onClick={handleEmailsClick}>
            <ListItemText primary="Emails" />
          </ListItem>
          <ListItem button onClick={handleProposalsClick}>
            <ListItemText primary="Proposals" />
          </ListItem>
          <ListItem button onClick={handleAppointmentsClick}>
            <ListItemText primary="Appointments" />
          </ListItem>
        </List>
      </Drawer>
      <Box sx={{ padding: { xs: 2, sm: 3 }, backgroundColor: 'background.default' }}>
        <DashboardPaper elevation={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <KeyMetrics 
                metrics={metrics}
                loading={loading}
                onNewLeadsClick={handleNewLeadsClick} 
                onEmailsClick={handleEmailsClick} 
                onProposalsClick={handleProposalsClick}
                onAppointmentsClick={handleAppointmentsClick}
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
                        labels: {
                          boxWidth: 10,
                          font: {
                            size: 10
                          }
                        }
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
                        labels: {
                          boxWidth: 10,
                          font: {
                            size: 10
                          }
                        }
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
              ) : showAppointments ? (
                <AppointmentsTable />
              ) : (
                <LeadsTable showOnlyNewLeads={showOnlyNewLeads} />
              )}
            </Grid>
          </Grid>
        </DashboardPaper>
      </Box>
    </Box>
  );
};

export default App;