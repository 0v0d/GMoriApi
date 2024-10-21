import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import axios from 'axios';
import { User, Upload, XCircle } from 'lucide-react';
import {
    Typography,
    Button,
    TextField,
    Container,
    Paper,
    CircularProgress,
    Box
} from "@mui/material";

const Alert: React.FC<{ children: React.ReactNode; variant: 'default' | 'destructive' }> = ({ children, variant }) => {
    const variantClasses = {
        default: { backgroundColor: 'green', color: 'white' },
        destructive: { backgroundColor: 'red', color: 'white' },
    };

    return (
        <Box sx={{ p: 2, mb: 2, borderRadius: 1, ...variantClasses[variant] }} role="alert">
            {children}
        </Box>
    );
};

const UserRegistrationForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (success) {
            timer = setTimeout(() => {
                setSuccess('');
            }, 5000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [success]);

    useEffect(() => {
        if (image) {
            const newImageUrl = URL.createObjectURL(image);
            setImageUrl(newImageUrl);
            return () => URL.revokeObjectURL(newImageUrl);
        } else {
            setImageUrl(null);
        }
    }, [image]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('user[name]', name);
        formData.append('user[description]', description);
        if (image) {
            formData.append('user[image]', image);
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/users`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess('ユーザーが正常に登録されました！');
            setName('');
            setDescription('');
            setImage(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error: any) {
            setError('ユーザーの登録に失敗しました。後でもう一度お試しください。');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
        }
    };

    const handleImageRemove = () => {
        setImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <User style={{ width: '48px', height: '48px', color: '#3f51b5' }} />
                    <Typography component="h1" variant="h5">
                        ユーザー登録
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '16px' }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="名前"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            InputLabelProps={{
                                sx: {
                                    '& .MuiInputLabel-asterisk': {
                                        color: 'red',
                                    },
                                },
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="description"
                            label="説明"
                            name="description"
                            multiline
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Button
                            variant="outlined"
                            color="primary"
                            component="label"
                            fullWidth
                            sx={{ mt: 2, mb: 2 }}
                            startIcon={<Upload />}
                        >
                            プロフィール画像をアップロード
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageChange}
                            />
                        </Button>
                        {imageUrl && (
                            <>
                                <Box display="flex" justifyContent="center" width="100%">
                                    <img
                                        src={imageUrl}
                                        alt="Preview"
                                        style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Box>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    startIcon={<XCircle />}
                                    onClick={handleImageRemove}
                                >
                                    画像を削除
                                </Button>
                            </>
                        )}
                        {error && <Alert variant="destructive">{error}</Alert>}
                        {success && <Alert variant="default">{success}</Alert>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : '登録'}
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default UserRegistrationForm;