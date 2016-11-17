namespace CV.DAL.CodeFirst
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class context : DbContext
    {
        public context()
            : base("name=context")
        {
        }

        public virtual DbSet<ATTACHMENT> ATTACHMENTs { get; set; }
        public virtual DbSet<CHAT_PORUKA> CHAT_PORUKA { get; set; }
        public virtual DbSet<COLLECTION> COLLECTIONs { get; set; }
        public virtual DbSet<COMPONENTDRAFT> COMPONENTDRAFTs { get; set; }
        public virtual DbSet<Criterion> CRITERIA { get; set; }
        public virtual DbSet<CV_CLAIM> CV_CLAIM { get; set; }
        public virtual DbSet<CV_FRAGMENT_TYPE> CV_FRAGMENT_TYPE { get; set; }
        public virtual DbSet<CV_ITEM> CV_ITEM { get; set; }
        public virtual DbSet<CV_ITEM_STATUS> CV_ITEM_STATUS { get; set; }
        public virtual DbSet<CV_LOG> CV_LOG { get; set; }
        public virtual DbSet<CV_MANAGE_ROLES> CV_MANAGE_ROLES { get; set; }
        public virtual DbSet<CV_ROLES> CV_ROLES { get; set; }
        public virtual DbSet<CV_TABLE> CV_TABLE { get; set; }
        public virtual DbSet<CV_USER> CV_USER { get; set; }
        public virtual DbSet<CV_USER_INFO> CV_USER_INFO { get; set; }
        public virtual DbSet<CV_XML_FRAGMENT> CV_XML_FRAGMENT { get; set; }
        public virtual DbSet<DNEVNI_RED> DNEVNI_RED { get; set; }
        public virtual DbSet<DOCUMENTTYPE> DOCUMENTTYPEs { get; set; }
        public virtual DbSet<DUMMY_TABLE> DUMMY_TABLE { get; set; }
        public virtual DbSet<GLA> GLAS { get; set; }
        public virtual DbSet<ITEM> ITEMs { get; set; }
        public virtual DbSet<METADATA> METADATAs { get; set; }
        public virtual DbSet<PRILOG> PRILOGs { get; set; }
        public virtual DbSet<SJEDNICA> SJEDNICAs { get; set; }
        public virtual DbSet<STATUS_SJEDNICE> STATUS_SJEDNICE { get; set; }
        public virtual DbSet<STATUS_STAVKE_DNEVNOG_REDA> STATUS_STAVKE_DNEVNOG_REDA { get; set; }
        public virtual DbSet<STATUS_UCESNIKA> STATUS_UCESNIKA { get; set; }
        public virtual DbSet<STAVKA_DNEVNOG_REDA> STAVKA_DNEVNOG_REDA { get; set; }
        public virtual DbSet<TIP_GLASA> TIP_GLASA { get; set; }
        public virtual DbSet<TIP_UCESNIKA> TIP_UCESNIKA { get; set; }
        public virtual DbSet<UCESNIK> UCESNIKs { get; set; }
        public virtual DbSet<ZAPISNIK> ZAPISNIKs { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ATTACHMENT>()
                .Property(e => e.ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<ATTACHMENT>()
                .Property(e => e.ITEMID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<ATTACHMENT>()
                .Property(e => e.PATH)
                .IsUnicode(false);

            modelBuilder.Entity<CHAT_PORUKA>()
                .Property(e => e.UCESNIK_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CHAT_PORUKA>()
                .Property(e => e.PORUKA)
                .IsUnicode(false);

            modelBuilder.Entity<COLLECTION>()
                .Property(e => e.ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<COLLECTION>()
                .Property(e => e.TITLE)
                .IsUnicode(false);

            modelBuilder.Entity<COLLECTION>()
                .Property(e => e.DESCRIPTION)
                .IsUnicode(false);

            modelBuilder.Entity<COLLECTION>()
                .Property(e => e.ISPRIVATE)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<COLLECTION>()
                .Property(e => e.CREATEDBY)
                .HasPrecision(38, 0);

            modelBuilder.Entity<COLLECTION>()
                .Property(e => e.MODIFIEDBY)
                .HasPrecision(38, 0);

            modelBuilder.Entity<COLLECTION>()
                .Property(e => e.ISDELETED)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<COMPONENTDRAFT>()
                .Property(e => e.ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<COMPONENTDRAFT>()
                .Property(e => e.COMPONENTID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<COMPONENTDRAFT>()
                .Property(e => e.APPROVED)
                .IsFixedLength();

            modelBuilder.Entity<Criterion>()
                .Property(e => e.NAME)
                .IsUnicode(false);

            modelBuilder.Entity<Criterion>()
                .Property(e => e.DESCRIPTION)
                .IsUnicode(false);

            modelBuilder.Entity<Criterion>()
                .Property(e => e.POINTS)
                .HasPrecision(38, 0);

            modelBuilder.Entity<Criterion>()
                .HasMany(e => e.CRITERIA1)
                .WithOptional(e => e.Criterion1)
                .HasForeignKey(e => e.PARENT_CRITERIA);

            modelBuilder.Entity<Criterion>()
                .HasMany(e => e.CV_ITEM)
                .WithOptional(e => e.Criterion)
                .HasForeignKey(e => e.CRITERIA_ID_CRITERIA);

            modelBuilder.Entity<CV_CLAIM>()
                .Property(e => e.TOKEN)
                .IsUnicode(false);

            modelBuilder.Entity<CV_CLAIM>()
                .Property(e => e.VALID)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<CV_FRAGMENT_TYPE>()
                .Property(e => e.FRAGMENT_TYPE)
                .IsUnicode(false);

            modelBuilder.Entity<CV_FRAGMENT_TYPE>()
                .HasMany(e => e.CV_XML_FRAGMENT)
                .WithOptional(e => e.CV_FRAGMENT_TYPE)
                .HasForeignKey(e => e.FRAGMENT_TYPE);

            modelBuilder.Entity<CV_ITEM>()
                .Property(e => e.NAME)
                .IsUnicode(false);

            modelBuilder.Entity<CV_ITEM>()
                .Property(e => e.DESCRIPTION)
                .IsUnicode(false);

            modelBuilder.Entity<CV_ITEM>()
                .Property(e => e.ATTACHMENT_LINK)
                .IsUnicode(false);

            modelBuilder.Entity<CV_ITEM>()
                .HasMany(e => e.CV_ITEM1)
                .WithOptional(e => e.CV_ITEM2)
                .HasForeignKey(e => e.OLD_ITEM_ID);

            modelBuilder.Entity<CV_ITEM_STATUS>()
                .Property(e => e.STATUS)
                .IsUnicode(false);

            modelBuilder.Entity<CV_ITEM_STATUS>()
                .HasMany(e => e.CV_ITEM)
                .WithRequired(e => e.CV_ITEM_STATUS)
                .HasForeignKey(e => e.STATUS_ID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CV_LOG>()
                .Property(e => e.LOG_TEXT)
                .IsUnicode(false);

            modelBuilder.Entity<CV_ROLES>()
                .Property(e => e.GROUP_NAME)
                .IsUnicode(false);

            modelBuilder.Entity<CV_ROLES>()
                .HasMany(e => e.CV_MANAGE_ROLES)
                .WithRequired(e => e.CV_ROLES)
                .HasForeignKey(e => e.ROLE_ID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CV_TABLE>()
                .Property(e => e.FIRSTNAME)
                .IsUnicode(false);

            modelBuilder.Entity<CV_TABLE>()
                .Property(e => e.LASTNAME)
                .IsUnicode(false);

            modelBuilder.Entity<CV_TABLE>()
                .Property(e => e.ADDRESS)
                .IsUnicode(false);

            modelBuilder.Entity<CV_TABLE>()
                .Property(e => e.PHONE)
                .IsUnicode(false);

            modelBuilder.Entity<CV_TABLE>()
                .Property(e => e.MOBILEPHONE)
                .IsUnicode(false);

            modelBuilder.Entity<CV_TABLE>()
                .Property(e => e.EMAIL)
                .IsUnicode(false);

            modelBuilder.Entity<CV_TABLE>()
                .HasMany(e => e.CV_ITEM)
                .WithRequired(e => e.CV_TABLE)
                .HasForeignKey(e => e.CV_TABLE_ID_CV)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CV_USER>()
                .Property(e => e.USERNAME)
                .IsUnicode(false);

            modelBuilder.Entity<CV_USER>()
                .Property(e => e.PASSWORD)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<CV_USER>()
                .Property(e => e.SALT)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<CV_USER>()
                .HasMany(e => e.COLLECTIONs)
                .WithRequired(e => e.CV_USER)
                .HasForeignKey(e => e.CREATEDBY)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CV_USER>()
                .HasMany(e => e.COLLECTIONs1)
                .WithRequired(e => e.CV_USER1)
                .HasForeignKey(e => e.MODIFIEDBY)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CV_USER>()
                .HasMany(e => e.CV_CLAIM)
                .WithRequired(e => e.CV_USER)
                .HasForeignKey(e => e.USER_ID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CV_USER>()
                .HasMany(e => e.CV_LOG)
                .WithRequired(e => e.CV_USER)
                .HasForeignKey(e => e.USER_ID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CV_USER>()
                .HasMany(e => e.CV_MANAGE_ROLES)
                .WithRequired(e => e.CV_USER)
                .HasForeignKey(e => e.USER_ID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CV_USER>()
                .HasMany(e => e.CV_TABLE)
                .WithRequired(e => e.CV_USER)
                .HasForeignKey(e => e.USER_ID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CV_USER>()
                .HasMany(e => e.ITEMs)
                .WithRequired(e => e.CV_USER)
                .HasForeignKey(e => e.CREATEDBY)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CV_USER>()
                .HasMany(e => e.ITEMs1)
                .WithRequired(e => e.CV_USER1)
                .HasForeignKey(e => e.MODIFIEDBY)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CV_USER>()
                .HasMany(e => e.CV_USER_INFO)
                .WithRequired(e => e.CV_USER)
                .HasForeignKey(e => e.USER_ID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CV_USER>()
                .HasMany(e => e.CV_XML_FRAGMENT)
                .WithOptional(e => e.CV_USER)
                .HasForeignKey(e => e.USER_ID);

            modelBuilder.Entity<CV_USER>()
                .HasMany(e => e.UCESNIKs)
                .WithOptional(e => e.CV_USER)
                .HasForeignKey(e => e.UPOSLENIK_ID);

            modelBuilder.Entity<CV_USER_INFO>()
                .Property(e => e.FIRST_NAME)
                .IsUnicode(false);

            modelBuilder.Entity<CV_USER_INFO>()
                .Property(e => e.LAST_NAME)
                .IsUnicode(false);

            modelBuilder.Entity<CV_USER_INFO>()
                .Property(e => e.EMAIL)
                .IsUnicode(false);

            modelBuilder.Entity<CV_XML_FRAGMENT>()
                .HasMany(e => e.COMPONENTDRAFTs)
                .WithOptional(e => e.CV_XML_FRAGMENT)
                .HasForeignKey(e => e.COMPONENTID);

            modelBuilder.Entity<DNEVNI_RED>()
                .Property(e => e.SJEDNICA_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<DNEVNI_RED>()
                .HasMany(e => e.STAVKA_DNEVNOG_REDA)
                .WithRequired(e => e.DNEVNI_RED)
                .HasForeignKey(e => e.DNEVNI_RED_ID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<DOCUMENTTYPE>()
                .Property(e => e.ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<DOCUMENTTYPE>()
                .Property(e => e.DOCUMENTTYPE1)
                .IsUnicode(false);

            modelBuilder.Entity<DOCUMENTTYPE>()
                .HasMany(e => e.ITEMs)
                .WithRequired(e => e.DOCUMENTTYPE)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<DOCUMENTTYPE>()
                .HasMany(e => e.METADATAs)
                .WithRequired(e => e.DOCUMENTTYPE)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<GLA>()
                .Property(e => e.STAVKA_DNEVNOG_REDA_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<GLA>()
                .Property(e => e.TIP_GLASA_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<GLA>()
                .Property(e => e.UCESNIK_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<ITEM>()
                .Property(e => e.ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<ITEM>()
                .Property(e => e.COLLECTIONID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<ITEM>()
                .Property(e => e.DOCUMENTTYPEID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<ITEM>()
                .Property(e => e.ISPRIVATE)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ITEM>()
                .Property(e => e.TITLE)
                .IsUnicode(false);

            modelBuilder.Entity<ITEM>()
                .Property(e => e.CREATEDBY)
                .HasPrecision(38, 0);

            modelBuilder.Entity<ITEM>()
                .Property(e => e.MODIFIEDBY)
                .HasPrecision(38, 0);

            modelBuilder.Entity<ITEM>()
                .Property(e => e.ISDELETED)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ITEM>()
                .HasMany(e => e.ATTACHMENTs)
                .WithRequired(e => e.ITEM)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<METADATA>()
                .Property(e => e.ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<METADATA>()
                .Property(e => e.ITEMID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<METADATA>()
                .Property(e => e.DOCUMENTTYPEID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<METADATA>()
                .Property(e => e.AUTHOR)
                .IsUnicode(false);

            modelBuilder.Entity<METADATA>()
                .Property(e => e.ABSTRACT)
                .IsUnicode(false);

            modelBuilder.Entity<METADATA>()
                .Property(e => e.PUBLISHER)
                .IsUnicode(false);

            modelBuilder.Entity<METADATA>()
                .Property(e => e.LANGUAGE)
                .IsUnicode(false);

            modelBuilder.Entity<METADATA>()
                .Property(e => e.URL)
                .IsUnicode(false);

            modelBuilder.Entity<METADATA>()
                .Property(e => e.RIGHTS)
                .IsUnicode(false);

            modelBuilder.Entity<METADATA>()
                .Property(e => e.EXTRA)
                .IsUnicode(false);

            modelBuilder.Entity<PRILOG>()
                .Property(e => e.NAZIV)
                .IsUnicode(false);

            modelBuilder.Entity<PRILOG>()
                .Property(e => e.CONTENT_TYPE)
                .IsUnicode(false);

            modelBuilder.Entity<PRILOG>()
                .HasMany(e => e.ZAPISNIKs)
                .WithRequired(e => e.PRILOG)
                .HasForeignKey(e => e.PRILOG_ID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SJEDNICA>()
                .Property(e => e.NAZIV)
                .IsUnicode(false);

            modelBuilder.Entity<SJEDNICA>()
                .Property(e => e.DNEVNI_RED_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SJEDNICA>()
                .Property(e => e.SALA)
                .IsUnicode(false);

            modelBuilder.Entity<SJEDNICA>()
                .Property(e => e.STATUS_SJEDNICE_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SJEDNICA>()
                .Property(e => e.ZAPISNIK_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SJEDNICA>()
                .HasMany(e => e.DNEVNI_RED)
                .WithRequired(e => e.SJEDNICA)
                .HasForeignKey(e => e.SJEDNICA_ID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SJEDNICA>()
                .HasMany(e => e.SJEDNICA1)
                .WithRequired(e => e.SJEDNICA2)
                .HasForeignKey(e => e.STATUS_SJEDNICE_ID);

            modelBuilder.Entity<SJEDNICA>()
                .HasMany(e => e.UCESNIKs)
                .WithOptional(e => e.SJEDNICA)
                .HasForeignKey(e => e.SJEDNICA_ID);

            modelBuilder.Entity<SJEDNICA>()
                .HasMany(e => e.ZAPISNIKs)
                .WithRequired(e => e.SJEDNICA)
                .HasForeignKey(e => e.SJEDNICA_ID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<STATUS_SJEDNICE>()
                .Property(e => e.NAZIV)
                .IsUnicode(false);

            modelBuilder.Entity<STATUS_STAVKE_DNEVNOG_REDA>()
                .Property(e => e.NAZIV)
                .IsUnicode(false);

            modelBuilder.Entity<STATUS_STAVKE_DNEVNOG_REDA>()
                .HasMany(e => e.STAVKA_DNEVNOG_REDA)
                .WithRequired(e => e.STATUS_STAVKE_DNEVNOG_REDA)
                .HasForeignKey(e => e.STATUS_STAVKE_DR_ID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<STATUS_UCESNIKA>()
                .Property(e => e.NAZIV)
                .IsUnicode(false);

            modelBuilder.Entity<STATUS_UCESNIKA>()
                .HasMany(e => e.UCESNIKs)
                .WithRequired(e => e.STATUS_UCESNIKA)
                .HasForeignKey(e => e.STATUS_UCESNIKA_ID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<STAVKA_DNEVNOG_REDA>()
                .Property(e => e.DNEVNI_RED_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<STAVKA_DNEVNOG_REDA>()
                .Property(e => e.REDNI_BROJ)
                .HasPrecision(38, 0);

            modelBuilder.Entity<STAVKA_DNEVNOG_REDA>()
                .Property(e => e.NASLOV)
                .IsUnicode(false);

            modelBuilder.Entity<STAVKA_DNEVNOG_REDA>()
                .Property(e => e.OPIS)
                .IsUnicode(false);

            modelBuilder.Entity<STAVKA_DNEVNOG_REDA>()
                .Property(e => e.STATUS_STAVKE_DR_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<STAVKA_DNEVNOG_REDA>()
                .HasMany(e => e.GLAS)
                .WithRequired(e => e.STAVKA_DNEVNOG_REDA)
                .HasForeignKey(e => e.STAVKA_DNEVNOG_REDA_ID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<TIP_GLASA>()
                .Property(e => e.NAZIV)
                .IsUnicode(false);

            modelBuilder.Entity<TIP_GLASA>()
                .HasMany(e => e.GLAS)
                .WithRequired(e => e.TIP_GLASA)
                .HasForeignKey(e => e.TIP_GLASA_ID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<TIP_UCESNIKA>()
                .Property(e => e.NAZIV)
                .IsUnicode(false);

            modelBuilder.Entity<TIP_UCESNIKA>()
                .HasMany(e => e.UCESNIKs)
                .WithRequired(e => e.TIP_UCESNIKA)
                .HasForeignKey(e => e.TIP_UCESNIKA_ID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<UCESNIK>()
                .Property(e => e.UPOSLENIK_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<UCESNIK>()
                .Property(e => e.SJEDNICA_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<UCESNIK>()
                .Property(e => e.TIP_UCESNIKA_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<UCESNIK>()
                .Property(e => e.STATUS_UCESNIKA_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<UCESNIK>()
                .HasMany(e => e.CHAT_PORUKA)
                .WithRequired(e => e.UCESNIK)
                .HasForeignKey(e => e.UCESNIK_ID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<UCESNIK>()
                .HasMany(e => e.GLAS)
                .WithRequired(e => e.UCESNIK)
                .HasForeignKey(e => e.UCESNIK_ID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<UCESNIK>()
                .HasMany(e => e.ZAPISNIKs)
                .WithRequired(e => e.UCESNIK)
                .HasForeignKey(e => e.KREATOR_ID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ZAPISNIK>()
                .Property(e => e.TEKST)
                .IsUnicode(false);

            modelBuilder.Entity<ZAPISNIK>()
                .Property(e => e.SJEDNICA_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<ZAPISNIK>()
                .Property(e => e.PRILOG_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<ZAPISNIK>()
                .Property(e => e.KREATOR_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<ZAPISNIK>()
                .HasMany(e => e.SJEDNICAs)
                .WithOptional(e => e.ZAPISNIK)
                .HasForeignKey(e => e.ZAPISNIK_ID);
        }
    }
}
