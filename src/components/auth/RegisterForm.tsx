import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus } from 'lucide-react';

import Input from '../ui/Input';
import Button from '../ui/Button';
import { Card, CardBody, CardHeader, CardFooter } from '../ui/Card';
import { useAuth } from '../../context/AuthContext';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account');
    }
  };
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">Create Account</h2>
        <p className="text-gray-600 text-sm mt-1">
          Sign up to save locations and get weather alerts
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
            label="Name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            icon={<User size={18} className="text-gray-400" />}
            required
          />
          
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
          
          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            <UserPlus size={18} className="mr-2" />
            Sign Up
          </Button>
        </form>
      </CardBody>
      
      <CardFooter className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Log In
          </button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;