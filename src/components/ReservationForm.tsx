
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, Crown, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants, fadeIn, zoomIn } from '@/lib/animation-variants';

// Define the form schema with zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  time: z.string().min(1, { message: "Please select a time." }),
  guests: z.string().min(1, { message: "Please enter number of guests." }),
  phone: z.string().min(5, { message: "Phone number is required." }),
  specialRequests: z.string().optional(),
});

// Available time slots
const timeSlots = [
  "12:00", "12:30", 
  "13:00", "13:30", 
  "14:00", "14:30", 
  "18:00", "18:30", 
  "19:00", "19:30", 
  "20:00", "20:30", 
  "21:00", "21:30"
];

const ReservationForm: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      time: "",
      guests: "",
      phone: "",
      specialRequests: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Construct the WhatsApp message
      const message = encodeURIComponent(
        `New Reservation:
  Name: ${data.name}
  Date: ${format(data.date, 'PPP')}
  Time: ${data.time}
  Guests: ${data.guests}
  Phone: ${data.phone}
  Special Requests: ${data.specialRequests || 'None'}`
      );
      
      // Create WhatsApp link with the "+" sign for international format
      const whatsappUrl = `https://wa.me/+37433647007?text=${message}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      
      // Show success toast
      toast({
        title: "Reservation Sent",
        description: t('reservation.success'),
        className: "bg-green-50 border-green-200",
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reservation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <motion.div 
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-white backdrop-blur-sm bg-opacity-95 p-6 md:p-8 rounded-xl shadow-xl border border-gray-100"
    >
      <motion.div 
        variants={zoomIn}
        className="text-center mb-6"
      >
        <Crown className="mx-auto text-brand-gold mb-2" size={32} />
        <h3 className="text-2xl md:text-3xl font-bold text-brand-blue">{t('reservation.title')}</h3>
        <div className="gold-divider"></div>
        <p className="text-gray-600 mt-2">Experience luxury dining with us</p>
      </motion.div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {/* Name Field */}
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-brand-blue font-medium">{t('reservation.name')}*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="transition-all duration-200 focus:ring-brand-gold hover:border-brand-gold/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date Field */}
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-brand-blue font-medium">{t('reservation.date')}*</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal transition-all duration-200 border focus:ring-brand-gold hover:border-brand-gold/50",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 z-50" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              
              {/* Time Field */}
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-brand-blue font-medium">{t('reservation.time')}*</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal transition-all duration-200 border focus:ring-brand-gold hover:border-brand-gold/50",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value || "Select time"}
                              <Clock className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-52 p-0" align="start">
                          <div className="grid max-h-72 overflow-y-auto p-2">
                            {timeSlots.map((time) => (
                              <Button
                                key={time}
                                variant="ghost"
                                className={cn(
                                  "justify-start font-normal",
                                  field.value === time && "bg-brand-blue/10 text-brand-blue font-medium"
                                )}
                                onClick={() => {
                                  field.onChange(time);
                                  form.setValue("time", time);
                                }}
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Guests Field */}
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-brand-blue font-medium">{t('reservation.guests')}*</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type="number"
                            min="1"
                            max="20"
                            className="transition-all duration-200 focus:ring-brand-gold hover:border-brand-gold/50 pl-9"
                          />
                          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              
              {/* Phone Field */}
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-brand-blue font-medium">{t('reservation.phone')}*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          className="transition-all duration-200 focus:ring-brand-gold hover:border-brand-gold/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            </div>
            
            {/* Special Requests Field */}
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="specialRequests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-brand-blue font-medium">{t('reservation.special')}</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={3}
                        className="transition-all duration-200 focus:ring-brand-gold hover:border-brand-gold/50 resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="pt-2"
          >
            <Button 
              type="submit" 
              className="w-full bg-brand-blue hover:bg-brand-gold transition-colors duration-300 shine-effect text-white font-medium py-3 text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-pulse">Processing...</span>
                </>
              ) : (
                t('reservation.submit')
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
};

export default ReservationForm;
