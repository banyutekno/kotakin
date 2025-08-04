import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Button, FormLabel } from 'react-bootstrap';
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
    <div className="container py-5">
      <div className="column-bg card rounded-4 px-4 py-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h2 className="mb-4">
              <i className="bi bi-plus-circle" /> Add Repository
            </h2>
          </div>

          <div className="mb-3">
            <FormLabel>Repository URL</FormLabel>
            <input
              type="text"
              className={`form-control ${errors.url ? 'is-invalid' : ''}`}
              placeholder="https://github.com/your-repo"
              {...register('url', { required: 'URL is required' })}
            />
            {errors.url && <div className="invalid-feedback">{errors.url.message}</div>}
          </div>

          <div className="mt-4 d-grid gap-2">
            <Button type="submit" variant="primary" className="w-100">
              <i className="bi bi-plus" />
              Add Repository
            </Button>

            <Link to="/store">
              <Button type="button" variant="danger" className="w-100">
                <i className="bi bi-x" />
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
