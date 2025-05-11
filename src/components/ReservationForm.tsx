
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReservationForm: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    guests: '',
    phone: '',
    specialRequests: '',
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Construct the WhatsApp message
    const message = encodeURIComponent(
      `New Reservation:
Name: ${formData.name}
Date: ${formData.date}
Time: ${formData.time}
Guests: ${formData.guests}
Phone: ${formData.phone}
Special Requests: ${formData.specialRequests || 'None'}`
    );
    
    // Create WhatsApp link with the "+" sign for international format
    const whatsappUrl = `https://wa.me/+37433647007?text=${message}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Show success toast
    toast({
      title: "Reservation Sent",
      description: t('reservation.success'),
    });
    
    // Reset form
    setFormData({
      name: '',
      date: '',
      time: '',
      guests: '',
      phone: '',
      specialRequests: '',
    });
    
    setLoading(false);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <Crown className="mx-auto text-brand-gold mb-2" size={32} />
        <h3 className="text-2xl font-bold text-brand-blue">{t('reservation.title')}</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {t('reservation.name')}*
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              {t('reservation.date')}*
            </label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              {t('reservation.time')}*
            </label>
            <Input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
              {t('reservation.guests')}*
            </label>
            <Input
              id="guests"
              name="guests"
              type="number"
              min="1"
              max="20"
              value={formData.guests}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              {t('reservation.phone')}*
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
            {t('reservation.special')}
          </label>
          <Textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows={3}
            className="w-full"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-brand-blue hover:bg-brand-gold text-white"
          disabled={loading}
        >
          {t('reservation.submit')}
        </Button>
      </form>
    </div>
  );
};

export default ReservationForm;
