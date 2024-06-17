import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MaskedInput from "react-text-mask";
import { useBasketStore } from "store/basket-store";
import { z } from "zod";
import { useTranslation } from "react-i18next";
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const addressSchema = z.object({
  firstName: z.string().nonempty("Ad zorunludur"),
  lastName: z.string().nonempty("Soyad zorunludur"),
  address: z.string().nonempty("Adres zorunludur"),
});

const isValidExpiryDate = (date: string) => {
  const [month, year] = date.split("/").map(Number);
  if (!month || !year) return false;
  if (month < 1 || month > 12) return false;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false;
  }

  return true;
};

const paymentSchema = z.object({
  cardNumber: z
    .string()
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Geçersiz kart numarası"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Geçersiz son kullanma tarihi")
    .refine(isValidExpiryDate, "Geçmiş veya geçersiz tarih"),
  cvc: z.string().regex(/^\d{3}$/, "Geçersiz CVC"),
});

type AddressFormData = z.infer<typeof addressSchema>;
type PaymentFormData = z.infer<typeof paymentSchema>;

const PaymentModal: FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const clearBasket = useBasketStore((state) => state.clearBasket);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<AddressFormData & PaymentFormData>({
    resolver: zodResolver(step === 1 ? addressSchema : paymentSchema),
  });
  const modalRef = useRef<HTMLDivElement>(null);

  const onSubmit = useCallback(
    (data: AddressFormData & PaymentFormData) => {
      if (step === 1) {
        setStep(2);
      } else {
        console.log(data);
        onClose();
        clearBasket();
        navigate("/success");
      }
    },
    [navigate, onClose, step, clearBasket]
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const watchAllFields = watch();
  const isDisabled = useMemo(() => {
    if (step === 1) {
      return (
        !watchAllFields.firstName ||
        !watchAllFields.lastName ||
        !watchAllFields.address
      );
    }
    return (
      !watchAllFields.cardNumber ||
      !watchAllFields.expiryDate ||
      !watchAllFields.cvc
    );
  }, [watchAllFields, step]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[var(--color-secondary)] bg-opacity-50 flex justify-center items-center p-4">
      <div
        ref={modalRef}
        className="bg-[var(--color-secondary)] p-8 rounded-lg shadow-2xl w-full max-w-lg"
      >
        <div className="flex flex-col items-center mb-4">
          <div
            className={`flex items-center mb-4 ${
              step === 1 ? "text-[var(--color-primary)]" : "text-gray-500"
            }`}
            style={{ cursor: step === 2 ? "pointer" : "default" }}
            onClick={() => setStep(1)}
          >
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center border ${
                step === 1
                  ? "bg-[var(--color-primary)] text-white"
                  : "border-gray-500"
              }`}
            >
              1
            </div>
            <span className="ml-2">Adres Bilgisi</span>
          </div>
          <div
            className={`flex-grow border-l-4 h-16 ${
              step === 2 ? "border-[var(--color-primary)]" : "border-gray-500"
            }`}
          ></div>
          <div
            className={`flex items-center mt-4 ${
              step === 2 ? "text-[var(--color-primary)]" : "text-gray-500"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => setStep(2)}
          >
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center border ${
                step === 2
                  ? "bg-[var(--color-primary)] text-white"
                  : "border-gray-500"
              }`}
            >
              2
            </div>
            <span className="ml-2">Ödeme Bilgisi</span>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <>
              <div className="mb-4">
                <label className="block mb-2">{t("name")}</label>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full border p-2 rounded text-black"
                      placeholder="Adınız"
                    />
                  )}
                />
                {errors.firstName && (
                  <span className="text-red-500">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-2">Soyad</label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full border p-2 rounded text-black"
                      placeholder="Soyadınız"
                    />
                  )}
                />
                {errors.lastName && (
                  <span className="text-red-500">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-2">Adres</label>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full border p-2 rounded text-black"
                      placeholder="Adresiniz"
                    />
                  )}
                />
                {errors.address && (
                  <span className="text-red-500">{errors.address.message}</span>
                )}
              </div>
              <button
                type="button"
                className={`w-full mt-4 bg-[var(--color-primary)] text-white py-2 rounded-lg ${
                  isDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleSubmit(onSubmit)}
                disabled={isDisabled}
              >
                İlerle
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <div className="mb-4">
                <label className="block mb-2">Kart Numarası</label>
                <Controller
                  name="cardNumber"
                  control={control}
                  render={({ field }) => (
                    <MaskedInput
                      {...field}
                      mask={[
                        /[1-9]/,
                        /\d/,
                        /\d/,
                        /\d/,
                        " ",
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        " ",
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        " ",
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                      ]}
                      className="w-full border p-2 rounded text-black"
                      placeholder="1234 5678 9012 3456"
                    />
                  )}
                />
                {errors.cardNumber && (
                  <span className="text-red-500">
                    {errors.cardNumber.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-2">Son Kullanma Tarihi</label>
                <Controller
                  name="expiryDate"
                  control={control}
                  render={({ field }) => (
                    <MaskedInput
                      {...field}
                      mask={[/\d/, /\d/, "/", /\d/, /\d/]}
                      className="w-full border p-2 rounded text-black"
                      placeholder="MM/YY"
                    />
                  )}
                />
                {errors.expiryDate && (
                  <span className="text-red-500">
                    {errors.expiryDate.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-2">CVC</label>
                <Controller
                  name="cvc"
                  control={control}
                  render={({ field }) => (
                    <MaskedInput
                      {...field}
                      mask={[/\d/, /\d/, /\d/]}
                      className="w-full border p-2 rounded text-black"
                      placeholder="123"
                    />
                  )}
                />
                {errors.cvc && (
                  <span className="text-red-500">{errors.cvc.message}</span>
                )}
              </div>
              <div className="flex flex-col space-y-4">
                <button
                  type="button"
                  className="w-full bg-gray-300 text-black py-2 rounded-lg"
                  onClick={() => setStep(1)}
                >
                  Geri
                </button>
                <button
                  type="submit"
                  className={`w-full bg-[var(--color-primary)] text-white py-2 rounded-lg ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isDisabled}
                >
                  Ödeme Yap
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
