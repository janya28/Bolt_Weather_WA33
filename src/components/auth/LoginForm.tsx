import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';

import Input from '../ui/Input';
import Button from '../ui/Button';
import { Card, CardBody, CardHeader, CardFooter } from '../ui/Card';
import { useAuth } from '../../context/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">Log In</h2>
        <p className="text-gray-600 text-sm mt-1">
          Sign in to your account to access your weather dashboard
        </p>
      </CardHeader>
      
      <CardBody>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-800 p-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}
          
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            icon={<Mail size={18} className="text-gray-400" />}
            required
          />
          
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            icon={<Lock size={18} className="text-gray-400" />}
            required
          />
          
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            className="mt-2"
          >
            <LogIn size={18} className="mr-2" />
            Log In
          </Button>
        </form>
      </CardBody>
      
      <CardFooter className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign Up
          </button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;