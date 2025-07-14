import axios from 'axios';
import { React } from 'react';
import { Grid, Typography, Button, Box,Avatar,Grow,Zoom} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/shared/Loader';
import axiosAuth from '../../api/axiosAuth.jsx'



const primaryColor = '#4FC4CA';
const darkerShade = '#3CAEB4';
const lighterShade = '#6FDADE';

function Category() {
    const fetchCategories = async () => {
        const { data } =  await axiosAuth.get('categories');
        return data;
    };

    const { error, isError, isLoading, data } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: 6 * 60 * 60 * 1000,
        refetchOnWindowFocus: true,
        retry: 3,
    });

    if (isError) return <p>Error:{error.message}</p>;
    if (isLoading) return <Loader />;

    return (
        <Box sx={{
            padding: '60px 20px',
            background: 'linear-gradient(135deg, #f8fbfb 0%, #e6f7f8 100%)',
            minHeight: '100vh',
            textAlign: 'center'
        }}>
            <Typography variant="h2" sx={{
                mb: 6,
                fontWeight: 'bold',
                color: '#2a7a7e',
                position: 'relative',
                display: 'inline-block',
                '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80px',
                    height: '4px',
                    background: `linear-gradient(45deg, ${primaryColor}, ${darkerShade})`,
                    borderRadius: '2pxf'
                }
            }}>
                Browsing

            </Typography>

            <Grid container spacing={4} justifyContent="center">
                {data.map((category, index) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={category.id}>
                        <Grow in={true} timeout={index * 200}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                height: '100%', 
                                padding: '0 8px', 
                                '&:hover': {
                                    transform: 'translateY(-5px)'
                                }
                            }}>
                                <Avatar
                                    src="/categorys.png"
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        backgroundColor: primaryColor,
                                        border: `3px solid ${darkerShade}`,
                                        boxShadow: `0 4px 8px ${primaryColor}50`,
                                        marginBottom: 1.5, 
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: `0 6px 12px ${primaryColor}80`
                                        }
                                    }}
                                />
                                <Box sx={{
                                    minHeight: '60px', 
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    width: '100%'
                                }}>
                                    <Typography variant="subtitle1" sx={{
                                        fontWeight: '600',
                                        color: '#2a7a7e',
                                        textAlign: 'center',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        lineHeight: '1.4',
                                        marginBottom: '4px'
                                    }}>
                                        {category.name}
                                    </Typography>
                                </Box>
                                <Zoom in={true} timeout={1000}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            background: `linear-gradient(45deg, ${darkerShade} 0%, ${primaryColor} 100%)`,
                                            color: 'white',
                                            fontWeight: 'bold',
                                            borderRadius: '20px',
                                            padding: '4px 16px',
                                            fontSize: '0.75rem',
                                            boxShadow: `0 2px 6px ${primaryColor}60`,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                background: `linear-gradient(45deg, ${primaryColor} 0%, ${lighterShade} 100%)`,
                                                boxShadow: `0 4px 10px ${primaryColor}80`
                                            }
                                        }}
                                    >
                                        Details
                                    </Button>
                                </Zoom>
                            </Box>
                        </Grow>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Category;