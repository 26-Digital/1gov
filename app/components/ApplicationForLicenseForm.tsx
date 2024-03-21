'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { formSchema } from '../lib/licenseSchema';
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stepper } from './Stepper';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from '@/components/ui/toast';
// interface FormData {
//   //Fields 
//   firstnames: string;
//   surname: string;
//   registrationnumber:number;
//   status:string;
//   categoriesofpractice: string;
//   subcategories:string;
  
// }

interface Props {
  onClose: () => void;
}

const steps = [
  {
    id: 'Step 1',
    name: 'Applicants Info',
    fields: []
  },
  {
    id: 'Step 2',
    name: 'Offence',
    fields: []
  },
  {
    id: 'Step 3',
    name: 'Declaration',
    fields: []
  },
  {
    id: 'Step 4',
    name: 'Complete',
    fields: []
  },
]

const ApplicationForLicenseForm: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast()
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    setIsSubmitting(true);
    toast({
      title: "Scheduled: Catch up ",
      description: "Friday, February 10, 2023 at 5:57 PM",
      action: (
        <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
      ),
    })
    setIsSubmitting(false);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProfileChecked, setIsProfileChecked] = useState(false);
  const next = async () => {
    const fields = steps[currentStep].fields

    //if(!output) return
    if (currentStep < steps.length - 1){
        if(currentStep === steps.length - 2){
            
            //await handleSubmit(processForm)()
        }

        setPreviousStep(currentStep)
        setCurrentStep(step => step + 1)
        }
    }    
  const prev = () => {
    if (currentStep > 0){
        setPreviousStep(step => step + 1)
        setCurrentStep(step => step - 1)
    }
  }

  return (
    <div>
      <div className='flex md:m-5 w-full space-x-1 md:h-full'>
        <nav className='w-48 hidden md:block'>
          <Stepper currentStep={currentStep} steps={steps}/>
        </nav>
      
        <Form {...form}>
          <form className="w-[calc(100%)] md:pr-1" onSubmit={form.handleSubmit(handleSubmit)}>
            {currentStep === 0 && (
              <motion.div
                    initial={{y: delta >= 0 ? '50%' : '-50%', opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{duration: 0.3, ease: 'easeInOut'}}
                >
                  <div className="border md:h-96 h-96 overflow-auto w-[calc(100%)] md:w-full rounded-lg mb-1">
                    <div className="grid md:gap-y-10 gap-2 gap-x-10 m-2 md:mb-6 md:grid-cols-2 sm:grid-cols-1">
                    <FormField
                        control={form.control}
                        name="application_info.forenames"
                        render={({field}) =>{
                            return <FormItem>
                                <FormLabel>FirstName</FormLabel>
                                <FormControl>
                                    <Input
                                    placeholder="First name"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        }}
                    /> 
                      <FormField
                        control={form.control}
                        name="application_info.surname"
                        render={({field}) =>{
                            return <FormItem>
                                <FormLabel>FirstName</FormLabel>
                                <FormControl>
                                    <Input
                                    placeholder="First name"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        }}
                    /> 
                    </div>
                  </div>
              </motion.div> 
              )}
              {currentStep === 1 && (
                  <motion.div
                  initial={{y: delta >= 0 ? '50%' : '-50%', opacity: 0}}
                  animate={{y: 0, opacity: 1}}
                  transition={{duration: 0.3, ease: 'easeInOut'}}
                  >
                <div className="border md:h-96 h-96 overflow-auto w-[calc(100%)] md:w-full rounded-lg mb-1">
                  <div className="grid md:gap-y-10 gap-2 gap-x-10 m-2 md:mb-6 md:grid-cols-2 sm:grid-cols-1">
                      <FormField
                          control={form.control}
                          name="application_info.forenames"
                          render={({field}) =>{
                              return <FormItem>
                                  <FormLabel>FirstName</FormLabel>
                                  <FormControl>
                                      <Input
                                      placeholder="First name"
                                      {...field}
                                      />
                                  </FormControl>
                                  <FormMessage/>
                              </FormItem>
                          }}
                      /> 
                        <FormField
                          control={form.control}
                          name="application_info.surname"
                          render={({field}) =>{
                              return <FormItem>
                                  <FormLabel>FirstName</FormLabel>
                                  <FormControl>
                                      <Input
                                      placeholder="First name"
                                      {...field}
                                      />
                                  </FormControl>
                                  <FormMessage/>
                              </FormItem>
                          }}
                      /> 
                  </div>
                </div>
              </motion.div> 
              )}
              {currentStep === 2 && (
                  <motion.div
                  initial={{y: delta >= 0 ? '50%' : '-50%', opacity: 0}}
                  animate={{y: 0, opacity: 1}}
                  transition={{duration: 0.3, ease: 'easeInOut'}}
                  >
                <div className="border md:h-96 h-96 overflow-auto w-[calc(100%)] md:w-full rounded-lg mb-1">
                  <div className="grid md:gap-y-10 gap-2 gap-x-10 m-2 md:mb-6 md:grid-cols-2 sm:grid-cols-1">
                      <FormField
                          control={form.control}
                          name="application_info.forenames"
                          render={({field}) =>{
                              return <FormItem>
                                  <FormLabel>FirstName</FormLabel>
                                  <FormControl>
                                      <Input
                                      placeholder="First name"
                                      {...field}
                                      />
                                  </FormControl>
                                  <FormMessage/>
                              </FormItem>
                          }}
                      /> 
                        <FormField
                          control={form.control}
                          name="application_info.surname"
                          render={({field}) =>{
                              return <FormItem>
                                  <FormLabel>FirstName</FormLabel>
                                  <FormControl>
                                      <Input
                                      placeholder="First name"
                                      {...field}
                                      />
                                  </FormControl>
                                  <FormMessage/>
                              </FormItem>
                          }}
                      /> 
                  </div>
                </div>
              </motion.div> 
              )}
              {currentStep === 3 && (
                  <motion.div
                  initial={{y: delta >= 0 ? '50%' : '-50%', opacity: 0}}
                  animate={{y: 0, opacity: 1}}
                  transition={{duration: 0.3, ease: 'easeInOut'}}
                  >
                <div className="border md:h-96 h-96 overflow-auto w-[calc(100%)] md:w-full rounded-lg mb-1">
                  <div className="grid md:gap-y-10 gap-2 gap-x-10 m-2 md:mb-6 md:grid-cols-2 sm:grid-cols-1">
                      <FormField
                          control={form.control}
                          name="application_info.forenames"
                          render={({field}) =>{
                              return <FormItem>
                                  <FormLabel>FirstName</FormLabel>
                                  <FormControl>
                                      <Input
                                      placeholder="First name"
                                      {...field}
                                      />
                                  </FormControl>
                                  <FormMessage/>
                              </FormItem>
                          }}
                      /> 
                        <FormField
                          control={form.control}
                          name="application_info.surname"
                          render={({field}) =>{
                              return <FormItem>
                                  <FormLabel>FirstName</FormLabel>
                                  <FormControl>
                                      <Input
                                      placeholder="First name"
                                      {...field}
                                      />
                                  </FormControl>
                                  <FormMessage/>
                              </FormItem>
                          }}
                      /> 
                  </div>
                </div>
              </motion.div> 
              )}
          {/*Buttons*/}
          <div className='flex float-end space-x-2 mx-5'>
            <button 
              type="button" 
              hidden={currentStep !== steps.length - 1}
              onClick={onClose}
              className="py-2 px-4 me-2 mb-0 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
            >Close</button>
            <button 
              type="button" 
              hidden={( currentStep === steps.length - 1)}
              className="py-2 px-4 me-2 mb-0 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
            >Save</button>
            <button 
              type="button" 
              onClick={prev}
              hidden={currentStep === steps.length - 1}
              className="py-2 px-4 me-2 mb-0 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
            >Prev</button>
            <button 
              type="button" 
              hidden={currentStep === steps.length - 2}
              onClick={next}
              disabled={currentStep === steps.length - 1} // set back to 3
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center"
            >Next</button>           
            <button 
              type="submit" 
              hidden={currentStep !== steps.length -2}
              disabled={isSubmitting} // Disable the button while submitting
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center"
            >{isSubmitting? "Submitting...." : "Submit"}</button>
              </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ApplicationForLicenseForm;
