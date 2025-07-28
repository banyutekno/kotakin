import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button, FormLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addRepo } from '../services/repo';

interface FormValues {
  url: string;
}

export default function RepoAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    await addRepo(values.url);
    navigate('/store');
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Add Repository</h1>

        <div className="mb-3">
          <div className="mb-3">
            <FormLabel>URL</FormLabel>
            <input type="text" className="form-control" {...register('url', { required: 'URL is required' })} />
            {errors.url && <p>{errors.url.message}</p>}
          </div>
        </div>

        <Button type="submit">Add Repo</Button>
      </form>
    </div>
  );
}
