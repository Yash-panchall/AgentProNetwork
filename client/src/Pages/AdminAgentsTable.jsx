import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';

const AgentTable = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default to 10 rows per page
  const [totalAgents, setTotalAgents] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState(null);

  const fetchAgents = async (page, limit) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/agents?page=${page + 1}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AdminToken')}`
        }
      });
      const data = await response.json();
      setAgents(data.agents);
      setTotalAgents(data.totalAgents);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  useEffect(() => {
    fetchAgents(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/agents/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AdminToken')}`
        }
      });

      if (response.ok) {
        setAgents(agents.filter(agent => agent._id !== id));
        setTotalAgents(totalAgents - 1);
      } else {
        console.error('Failed to delete agent');
      }
    } catch (error) {
      console.error('Error deleting agent:', error);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/agents/status/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('AdminToken')}`,
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });

      if (response.ok) {
        setAgents(agents.map(agent => 
          agent._id === id ? { ...agent, isActive: !agent.isActive } : agent
        ));
      } else {
        console.error('Failed to toggle agent status');
      }
    } catch (error) {
      console.error('Error toggling agent status:', error);
    }
  };

  const handleOpenDialog = (id) => {
    setSelectedAgentId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAgentId(null);
  };

  const confirmDelete = () => {
    if (selectedAgentId) {
      handleDelete(selectedAgentId);
      handleCloseDialog();
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 200px)' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">
                  Username
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">
                  License Number
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">
                  Phone Number
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">
                  Company
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">
                  Specializations
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent._id}>
                <TableCell sx={{ maxWidth: 150, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{agent.username}</TableCell>
                <TableCell sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{agent.email}</TableCell>
                <TableCell sx={{ maxWidth: 150, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{agent.license_number}</TableCell>
                <TableCell sx={{ maxWidth: 150, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{agent.phone_number}</TableCell>
                <TableCell sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{agent.company}</TableCell>
                <TableCell sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{agent.specializations}</TableCell>
                <TableCell>{agent.isActive ? 'Active' : 'Not Active'}</TableCell>
                <TableCell>
                  <NavLink to={`/admin/agents/profile/${agent._id}`}>
                    <IconButton color="primary" size="small">
                      <EditIcon />
                    </IconButton>
                  </NavLink>
                  <IconButton onClick={() => handleToggleStatus(agent._id, agent.isActive)} color={agent.isActive ? "secondary" : "primary"} size="small">
                    {agent.isActive ? 'Deactivate' : 'Activate'}
                  </IconButton>
                  <IconButton onClick={() => handleOpenDialog(agent._id)} color="secondary" size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalAgents}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ disabled: page >= Math.ceil(totalAgents / rowsPerPage) - 1 }}
      />
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this agent?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AgentTable;