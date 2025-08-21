import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button, FormLabel, Spinner } from 'react-bootstrap';
import { addRepo } from '../services/repo';
import { useNav } from '../hooks/nav';
import { useEffect } from 'react';
import { useToast } from '../contexts/ToastProvider';

interface FormValues {
  url: string;
}

export default function RepoAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const { popPage } = useNav();
  const { showToast } = useToast();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      await addRepo(values.url);
      showToast('Repository added successfully', { variant: 'success' });
      popPage('/store');
    } catch (error) {
      showToast(`Failed to add repository: ${error}`, { variant: 'danger' });
    }
  };

  useEffect(() => {
    document.title = 'Add Repository | Kotakin';
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="row w-100 g-0">
            <div className="col-6 col-md-3 text-start order-1 order-md-1">
              <div className="d-flex align-items-center">
                <Button onClick={() => popPage('/')} variant="link" className="text-body">
                  <i className="bi bi-arrow-left" />
                </Button>
                <span>Add Repository</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <div className="mb-3">
            <Button type="submit" variant="primary">
              {isSubmitting ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  <span className="ms-2">Adding...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-plus" />
                  Add Repository
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
