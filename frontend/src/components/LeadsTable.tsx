import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Avatar, Chip, Link, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { backend } from 'declarations/backend';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
}));

type Lead = {
  name: string;
  status: string;
  email: string;
  createdTime: string;
  assignee: string;
};

interface LeadsTableProps {
  showOnlyNewLeads: boolean;
}

const LeadsTable: React.FC<LeadsTableProps> = ({ showOnlyNewLeads }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = showOnlyNewLeads ? await backend.getNewLeads() : await backend.getLeads();
        setLeads(result);
      } catch (error) {
        console.error('Error fetching leads:', error);
        setError('Failed to fetch leads. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [showOnlyNewLeads]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom sx={{ p: 2 }}>
        {showOnlyNewLeads ? 'New Leads' : 'All Leads'}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            {!isMobile && (
              <>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Created Time</StyledTableCell>
                <StyledTableCell>Assignee</StyledTableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {leads.map((lead, index) => (
            <TableRow key={index}>
              <TableCell>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={`https://i.pravatar.cc/32?u=${lead.email}`} alt={lead.name} sx={{ mr: 1 }} />
                  {lead.name}
                </div>
              </TableCell>
              <TableCell>
                <Chip
                  label={lead.status}
                  color={lead.status === 'New' ? 'default' : 'success'}
                  size="small"
                />
              </TableCell>
              {!isMobile && (
                <>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.createdTime}</TableCell>
                  <TableCell>{lead.assignee}</TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography variant="body2" sx={{ p: 2, textAlign: 'right' }}>
        <Link href="#" color="primary">View All Leads</Link>
      </Typography>
    </TableContainer>
  );
};

export default LeadsTable;