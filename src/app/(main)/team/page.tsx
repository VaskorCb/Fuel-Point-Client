'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useAtomValue } from 'jotai';
import { PersonAdd } from '@mui/icons-material';
import { userRoleAtom } from 'store/auth';
import { useTeam, useInviteUser } from 'services/users/users.hooks';
import type { InviteUserFormValues, TeamMember } from 'types/auth-and-onboarding';
import { useTranslation } from 'react-i18next';

export default function TeamPage() {
  const { t } = useTranslation();
  const userRole = useAtomValue(userRoleAtom);
  const isOwner = userRole === 'OWNER';
  const { data: teamData, isLoading } = useTeam();
  const inviteUser = useInviteUser();

  const team: TeamMember[] = teamData?.data ?? [];
  const [form, setForm] = useState<InviteUserFormValues>({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInvite = async () => {
    setError('');
    setSuccess('');

    if (!form.name || !form.email || !form.password) {
      setError(t('fill_all_fields'));
      return;
    }

    try {
      await inviteUser.mutateAsync(form);
      setForm({ name: '', email: '', password: '' });
      setSuccess(t('invited_success'));
    } catch (err: any) {
      setError(err?.data?.message || 'Failed to invite user');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
        {t('team_management')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {t('invite_desc')}
      </Typography>

      {/* Invite Form — OWNER only */}
      {isOwner && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              {t('invite_new_member')}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
                {success}
              </Alert>
            )}

            <Grid container spacing={2} alignItems="flex-end">
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label={t('name')}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label={t('email')}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  fullWidth
                  label={t('password')}
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 1 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleInvite}
                  disabled={inviteUser.isPending}
                  startIcon={inviteUser.isPending ? <CircularProgress size={16} /> : <PersonAdd />}
                >
                  {t('invite')}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Team Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            {t('team_members')}
          </Typography>

          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('name')}</TableCell>
                    <TableCell>{t('email')}</TableCell>
                    <TableCell>{t('role')}</TableCell>
                    <TableCell>{t('joined')}</TableCell>
                    <TableCell>{t('status')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {team.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <Typography color="text.secondary" sx={{ py: 2 }}>
                          {t('no_team_members')}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    team.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>
                          <Chip label={member.role} size="small" color="primary" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          {new Date(member.createdAt).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={member.isActive ? t('active') : t('inactive')}
                            color={member.isActive ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
