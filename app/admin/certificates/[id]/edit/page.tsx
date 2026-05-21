'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Loader2, HelpCircle } from 'lucide-react';
import { ModernCertificate } from '@/components/certificates/ModernCertificate';
import { Tooltip } from '@/components/ui/Tooltip';

export default function EditCertificatePage() {
  const params = useParams();
  const router = useRouter();
  const certificateId = params?.id as string | undefined;
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    templateUrl: '',
    courseId: '',
    signatureUrl: ''
  });

  const activeLocale = 'en';
  const getDisplayTitle = (title: any) => {
    if (typeof title === 'string') return title;
    if (title && typeof title === 'object') return title[activeLocale] || title.en || Object.values(title)[0] || '';
    return '';
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log('Resolving certificate data for ID:', certificateId);
      if (!certificateId) {
        console.warn('Certificate ID is missing from params');
        return;
      }
      try {
        const [certRes, courseRes] = await Promise.all([
          fetch(`/api/certificates/${certificateId}`),
          fetch('/api/courses')
        ]);

        const certData = await certRes.json();
        const courseData = await courseRes.json();

        if (!certRes.ok || !certData.success) {
          throw new Error(certData.error || 'Certificate not found');
        }

        if (courseData.success) {
          setCourses(courseData.data || []);
        }

        setFormData({
          name: certData.data?.name || '',
          description: certData.data?.description || '',
          templateUrl: certData.data?.templateUrl || '',
          courseId: certData.data?.courseId || '',
          signatureUrl: certData.data?.signatureUrl || ''
        });
      } catch (error: any) {
        toast.error(error.message || 'Failed to load certificate');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [certificateId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!certificateId) return;

    if (!formData.name || !formData.courseId) {
      toast.error('Certificate name and course are required');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/certificates/${certificateId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update certificate');
      }
      toast.success('Certificate updated');
      router.push('/admin/certificates');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update certificate');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Edit Certificate</h1>
        </div>
        <Link href="/admin/certificates" className="text-sm text-zinc-500 hover:text-zinc-900">
          &larr; Back to Certificates
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-zinc-200 rounded-md p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4 pb-2 border-b">Certificate Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <label className="text-sm font-medium text-zinc-700">Certificate Name (Recipient Display)</label>
                <Tooltip content="The name that will appear on the certificate. Usually the student's full name." />
              </div>
              <input
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm"
                placeholder="e.g. John Doe"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <label className="text-sm font-medium text-zinc-700">Course</label>
                <Tooltip content="The course this certificate is being awarded for." />
              </div>
              <select
                value={formData.courseId}
                onChange={(e) => setFormData((prev) => ({ ...prev, courseId: e.target.value }))}
                className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {getDisplayTitle(course.title)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <label className="text-sm font-medium text-zinc-700">Custom Description</label>
                <Tooltip content="A short message or description of the award. Leave empty for default text." />
              </div>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm"
                rows={4}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <label className="text-sm font-medium text-zinc-700">Signature URL (Optional)</label>
                <Tooltip content="Upload your signature to a hosting service and paste the direct image link here." />
              </div>
              <input
                value={formData.signatureUrl || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, signatureUrl: e.target.value }))}
                className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm"
                placeholder="https://example.com/signature.png"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="bg-[#2271b1] hover:bg-[#135e96] text-white text-sm font-medium px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Update Certificate
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium">Live Preview (Modern Template)</h2>
          <div className="bg-zinc-100 p-4 sm:p-8 rounded-xl border-2 border-dashed border-zinc-300 overflow-hidden">
             <div className="flex items-center justify-center min-h-[480px]">
                <div className="w-[850px] shadow-2xl scale-[0.4] sm:scale-[0.45] md:scale-[0.55] lg:scale-[0.6] xl:scale-[0.65] origin-center">
                   <ModernCertificate 
                      userName={formData.name || 'Recipient Name'}
                      courseTitle={courses.find(c => c._id === formData.courseId) ? getDisplayTitle(courses.find(c => c._id === formData.courseId).title) : 'Course Title'}
                      issuedAt={new Date().toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, ' / ')}
                      description={formData.description || `This certificate is awarded in recognition of successfully completing the requirements.`}
                      signatureUrl={formData.signatureUrl}
                   />
                </div>
             </div>
          </div>
          <p className="text-xs text-zinc-500 italic text-center">
             Previewing: {formData.name}
          </p>
        </div>
      </div>
    </div>
  );
}
