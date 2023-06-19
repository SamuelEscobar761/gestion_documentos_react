import { Grid, TextField, Button } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Aquí puedes enviar los datos del formulario a tu servidor
    navigate("/");
  };

  return (
    <AuthLayout title="Registrarse a Souvenir">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              {...register('email', { required: 'Campo requerido', pattern: { value: /^\S+@\S+$/i, message: 'Ingrese un correo electrónico válido' } })}
              label="Email"
              type="email"
              placeholder="email@gmail.com"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              {...register('password', { required: 'Campo requerido' })}
              label="Password"
              type="password"
              placeholder="Contraseña"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              {...register('passwordVerified', { required: 'Campo requerido' })}
              label="Verificar Password"
              type="password"
              placeholder="Verificar Password"
              fullWidth
              error={!!errors.passwordVerified}
              helperText={errors.passwordVerified?.message}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={12}>
              <Button type="submit" variant="contained" fullWidth>
                Registrar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
