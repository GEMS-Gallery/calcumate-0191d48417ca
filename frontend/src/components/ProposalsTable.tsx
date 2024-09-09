import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip, Link, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { backend } from 'declarations/backend';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
}));

type Proposal = {
  clientName: string;
  projectName: string;
  value: number;
  submissionDate: string;
  status: string;
};

const ProposalsTable: React.FC = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await backend.getProposals();
        setProposals(result);
      } catch (error) {
        console.error('Error fetching proposals:', error);
        setError('Failed to fetch proposals. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom sx={{ p: 2 }}>Proposals</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Client Name</StyledTableCell>
            {!isMobile && <StyledTableCell>Project Name</StyledTableCell>}
            <StyledTableCell>Value</StyledTableCell>
            {!isMobile && <StyledTableCell>Submission Date</StyledTableCell>}
            <StyledTableCell>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {proposals.map((proposal, index) => (
            <TableRow key={index}>
              <TableCell>{proposal.clientName}</TableCell>
              {!isMobile && <TableCell>{proposal.projectName}</TableCell>}
              <TableCell>${proposal.value.toLocaleString()}</TableCell>
              {!isMobile && <TableCell>{proposal.submissionDate}</TableCell>}
              <TableCell>
                <Chip
                  label={proposal.status}
                  color={proposal.status === 'Accepted' ? 'success' : proposal.status === 'Pending' ? 'warning' : 'default'}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography variant="body2" sx={{ p: 2, textAlign: 'right' }}>
        <Link href="#" color="primary">View All Proposals</Link>
      </Typography>
    </TableContainer>
  );
};

export default ProposalsTable;